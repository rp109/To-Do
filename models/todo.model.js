const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    status: { type: Boolean, required: true }
});


// Export the model
module.exports = mongoose.model('todo', Todo);