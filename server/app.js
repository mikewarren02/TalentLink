const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./auth')
require('dotenv').config()
const { Op } = require("sequelize");
const mongoose = require('mongoose')
const loginRouter = require('./routes/login')
const postRouter = require('./routes/post')



app.use(cors())
app.use(express.json())

// localhost:3030/login
app.use('/login', loginRouter)
app.use('/post', postRouter)



app.listen(process.env.PORT, () => {
    console.log("Server is running...");
  });
  