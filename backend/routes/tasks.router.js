const express = require('express')
const { getTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/task.controller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)

module.exports = router