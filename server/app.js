const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./auth')
require('dotenv').config()
const loginRouter = require('./routes/login')
const postRouter = require('./routes/post')
const memcoRouter = require('./routes/memco')
const messageRouter = require('./routes/message')




app.use(cors())
app.use(express.json())

// localhost:3030/login
app.use('/login', loginRouter)

// localhost:3030/post
app.use('/post', postRouter)

// localhost:3030/memco
app.use('/memco', memcoRouter)

// localhost:3030/mess
app.use('/mess', messageRouter)



app.listen(process.env.PORT, () => {
    console.log("Server is running...");
  });
  