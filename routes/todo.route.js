const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const TaskController = require('../controllers/todo.controller');


// a simple test
router.get('/test', TaskController.test);

//create
router.post('/create', TaskController.taskCreate);
//view all
router.get('/all', TaskController.allTaskDetails);
//view by id
router.get('/:id', TaskController.taskDetails);
//update
router.put('/update/:id', TaskController.taskUpdate);
//delete
router.delete('/delete/:id', TaskController.taskDelete);

module.exports = router;

