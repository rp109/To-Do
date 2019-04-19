// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./routes/todo.route'); // Imports routes for the Tasks
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = "mongodb://localhost:27017/todo";
//let dev_db_url = "mongodb+srv://root:root@cluster0-hhzns.mongodb.net/Test?retryWrites=true";

let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("connected to DB")
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('usefindAndModify', false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/app/v1/task', Task);
let port = 8081;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
