<h1 align="center">🛠️ QueueMaster</h1>

<p align="center">
  <strong>Backend System for Managing Requests Using Queue Structure</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v14.17.0-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-blue" alt="Express">
  <img src="https://img.shields.io/badge/Redis-6.x-red" alt="Redis">
  <img src="https://img.shields.io/badge/MongoDB-4.x-green" alt="MongoDB">
</p>

## 🌟 Overview

QueueMaster is a robust backend system designed to manage user requests efficiently using a queue structure. The system ensures that each client's requests are processed sequentially and supports high concurrency, scalability, and robustness.

## 🛠️ Features

- **User Authentication**: Securely authenticate users before they can enqueue requests.
- **Request Queueing**: Implement a queue for each client to handle requests in a First-In-First-Out (FIFO) manner using Redis with Kue.
- **Request Processing**: Sequentially handle and execute user requests.
- **Concurrency Management**: Efficiently handle multiple clients and their queues concurrently.
- **Scalability**: Ensure the system can scale to handle an increasing number of users and requests without performance degradation.
- **Robustness**: Implement error handling and recovery mechanisms to manage failures without data loss.
- **Logging and Monitoring**: Set up logging for tracking request handling and system monitoring for performance metrics.

## 📚 Documentation

- **API Documentation**: Detailed documentation on how to interact with the backend endpoints.
- **Queue Management Explanation**: Comprehensive explanation of the queue management system, its design principles, and usage.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.17.0 or higher)
- Redis (v6.x)
- MongoDB (v4.x)

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/queuemaster.git
    cd queuemaster
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```sh
    MONGO_URI=mongodb://localhost:27017/queuemaster
    REDIS_HOST=localhost
    REDIS_PORT=6379
    SECRET_KEY=your_secret_key
    ```

4. **Start the server**:
    ```sh
    npm start
    ```

## 🧪 Running Tests

1. **Install Mocha globally**:
    ```sh
    npm install -g mocha
    ```

2. **Run tests**:
    ```sh
    npm test
    ```

## 🏗️ Project Structure

```plaintext
├── models
│   ├── userModel.js
│   ├── queueModel.js
├── services
│   ├── queueService.js
├── controllers
│   ├── userController.js
│   ├── queueController.js
├── routes
│   ├── userRoutes.js
│   ├── queueRoutes.js
├── config
│   ├── redisConfig.js
│   ├── logger.js
├── test
│   ├── queueService.test.js
├── .env
├── index.js
├── package.json
└── README.md

```

<p align="center">
  Made with ❤️ by Gavaskar kathirvel
</p>
