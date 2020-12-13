const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const teacherRouter = require('../teachers/teachers-router');
const studentRouter = require('../students/students-router');

const server = express();
server.use(cors());
server.use(helmet());

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Welcome to teachr app' })
});

server.use('/api/auth', authRouter);
server.use('/api/teachers', teacherRouter);
server.use('/api/students', studentRouter);

module.exports = server;