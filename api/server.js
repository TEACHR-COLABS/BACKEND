const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/usersRouter');
const classRouter = require('../classes/classesRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Welcome to teachr app' })
});

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/classes', classRouter);

module.exports = server;