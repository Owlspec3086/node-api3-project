const express = require('express');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter');

const server = express();
// const port = process.env.Port || 8000;

//custom middleware
//Logs to the console everytime a request is called
function logger(req, res, next) {
  const date = new Date().toString();
  const url = req.url;
  const method = req.method;
  console.log(`${date} -- ${method} ${url}`);
  next();
}

server.use(logger);
server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).json({
    message: `App Ready and Running ${process.env.COHORT}`,
    fact: process.env.FUN_FACT || 'Manage the factor',
  });
});

module.exports = server;
