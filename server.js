require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/html'))
app.use('/api', require('./routes/api'))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connected to port ${port}`))