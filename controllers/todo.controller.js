const Task = require('../models/todo.model');

//Simple version, without validation or sanitation
const test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


// controllers/Tasks.js
const taskCreate = function (req, res, next) {
    console.log("body :", req.body);
    let task = new Task(
        {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,

        }
    );

    // task.save(function (err) {
    //     if (err) {
    //         return res.json({
    //             success: false,
    //             message: 'Unable to create new todo'
    //         });
    //     }
    //     // res.send('Task Created successfully')
    // })
    task.save().then((result) => {
        return res.json({
            success: true,
            message: 'Todo created successfully',
            data: result
        });
    }).catch((error) => {
        return res.json({
            success: false,
            message: 'Unable to create new todo',
            data: {}
        });
    });
};

const taskDetails = (req, res, next) => {
    Task.findById(req.params.id, (err, result) => {

        if (err) {
            console.log("error:", err)
            return next(err);
        }
        res.send(result);
    })
};

const allTaskDetails = async (req, res, next) => {
    try {
        Task.find({}).then((result) => {
            res.json(result);

        });
    }
    catch (err) {
        next(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    //next();
};
//return next()

const taskUpdate = function (req, res) {
    // console.log("inside")
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }).then((result) => {
        return res.json({
            success: true,
            message: 'Todo updated successfully',
            data: result
        });
    }).catch((error) => {
        return res.json({
            success: false,
            message: 'Unable to update new todo',
            data: {}
        });
    });
};
// , function (err, Task) {
//     if (err) return next(err);
//     res.send('Task udpated.');
// }
const taskDelete = function (req, res) {
    Task.findByIdAndDelete(req.params.id).then((result) => {
        return res.json({
            success: true,
            message: 'Todo deleted successfully',
            data: result
        });
    }).catch((error) => {
        // console.log("err: ", error);
        // res.send("Not Done!")
        return res.json({
            success: false,
            message: 'Unable to delete todo',
            data: {}
        });
    });
};
module.exports = {
    taskDelete, test, taskDetails,
    taskUpdate, taskCreate, allTaskDetails

}
