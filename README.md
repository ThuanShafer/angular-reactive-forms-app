# Cloud Computing 101 Chat Room

A simple chat room application built with Angular and Node.js. This app allows users to send and receive chat messages, with a randomly assigned username that persists throughout the session using `sessionStorage`.

## Features

- **Random Name Assignment**: Upon entering the chat, users are assigned a random name made up of an adjective and an animal. This name persists throughout the session.
- **Real-Time Chat**: Messages are displayed in real-time as they are sent.
- **Session Persistence**: The assigned name is stored in `sessionStorage`, so it remains the same during the session.
- **Backend with Node.js**: The backend is powered by Node.js, which handles reading and writing chat data to MongoDB.

## Technologies

- **Frontend**: Angular 14.2.0
- **Backend**: Node.js 14.17.0
- **Database**: MongoDB 4.4.6

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or a cloud database setup.

## Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/ThuanShafer/basic-chat-room-101.git
cd basic-chat-room-101
```
### 2. Install Dependencies:
```bash
npm install
```
### 3. Run the Application:
```bash
npm run start
# This will start both the Frontend and Backend
```
### 4. Open the Application:
Navigate to `http://localhost:4242/` in your browser to view the chat room.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.


