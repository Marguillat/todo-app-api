const { getTodos, deleteTodo, updateTodo } = require('../controllers/todoController')
const Todo = require('../models/Todo')
const router = require('express').Router()

router.route('/')
  .get(async (req, res) => {
    try {
      // rend la requette du controller
      const todos = await getTodos()
      return res.json(todos)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .post(async (req, res) => {
    console.log(req.body)

    try {
      const _todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        important: req.body.important
      })
      _todo.save()
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .delete(async (req,res)=>{
    deleteTodo(req.body._id)
  })

  .put(async ( req,res)=>{
    updateTodo(req.body)
  })

module.exports = router
