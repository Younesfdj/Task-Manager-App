const express = require("express")
const router = express.Router()
const {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,deleteUser
} = require('../controllers/taskController')

router.route('/tasks').get(getTasks)
                 .post(createTask)
router.route('/tasks/:id').get(getTask)
                    .patch(updateTask)
                    .delete(deleteTask)

router.route('/delUser').delete(deleteUser)

module.exports = router