require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware'); // Import the middleware
const path = require('path');

const server = express();
server.use(express.static(path.join(__dirname, 'public')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const questionRouter = require('./Routes/question');
const topicRouter = require('./Routes/topic');
const entryRouter = require('./Routes/entry');
const userRouter = require('./Routes/User')

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`mongodb+srv://yashvardhan:${process.env.DB_PASSWORD}@cluster0.m4lyy2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
  console.log("Database connected");
}

server.use(cors());
server.use(express.json());

server.use('/Questions',authMiddleware, questionRouter.route); // Apply middleware
server.use('/Topics', authMiddleware,  topicRouter.route); // Apply middleware
server.use('/entry', entryRouter.route);
server.use('/user', userRouter.route);

server.listen(process.env.PORT, () => {
  console.log("server is started on : ", process.env.PORT);
});
