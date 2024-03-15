const { getTodos, deleteTodo, updateTodo, createTodo } = require('../controllers/todoController')
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
    try {
      await createTodo(req.body)
      const todos = await getTodos()
      return res.json(todos)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .delete(async (req, res) => {
    try {
      if (req.body._id) {
        await deleteTodo(req.body._id)
        const todos = await getTodos()
        return res.json(todos)
      } else {
        throw new Error('_id is missing')
      }
    } catch (error) {
      return res.status(500).send(error)
    }
  })

  // je peux utiliser .update()
  .put(async (req, res) => {
    await updateTodo(req.body)
    const todos = await getTodos()
    return res.json(todos)
  })

module.exports = router
