const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../index'); // assuming your Express app is exported from index.js
const User = require('../Model/userModel');
const queue = require('../Config/queue');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('QueueMaster API', () => {
    before(function(done) {
        // Clear Redis and MongoDB data before running tests
        queue.testMode.enter();

        // Clear MongoDB
        mongoose.connection.dropDatabase(() => {
            done();
        });
    });

    after(function(done) {
        // Exit queue test mode after tests
        queue.testMode.exit();
        done();
    });

    it('should sign up a user successfully', function(done) {
        chai.request(app)
            .post('/api/users/signup')
            .send({ username: 'testuser', password: 'password' })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'User created successfully');

                // Check if the job was added to the queue
                const jobs = queue.testMode.jobs;
                expect(jobs.length).to.equal(1);
                expect(jobs[0].type).to.equal('user_signup');
                done();
            });
    });

    it('should login a user successfully', function(done) {
        const user = new User({ username: 'testuser', password: 'password' });
        user.password = user.generateHash(user.password); // Assuming you have a method to hash passwords
        user.save(function(err) {
            if (err) return done(err);

            chai.request(app)
                .post('/api/users/login')
                .send({ username: 'testuser', password: 'password' })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');

                    // Check if the job was added to the queue
                    const jobs = queue.testMode.jobs;
                    expect(jobs.length).to.equal(2); // One from signup, one from login
                    expect(jobs[1].type).to.equal('user_login');
                    done();
                });
        });
    });

    it('should return 404 when user is not found', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({ username: 'nonexistentuser', password: 'password' })
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message', 'User not found');
                done();
            });
    });

    it('should return 401 for invalid password', function(done) {
        const user = new User({ username: 'testuser', password: 'password' });
        user.password = user.generateHash(user.password); // Assuming you have a method to hash passwords
        user.save(function(err) {
            if (err) return done(err);

            chai.request(app)
                .post('/api/users/login')
                .send({ username: 'testuser', password: 'wrongpassword' })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Invalid password');
                    done();
                });
        });
    });
});
