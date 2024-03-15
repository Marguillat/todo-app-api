const { getTodos, deleteTodo, updateTodo, createTodo } = require('../controllers/todoController')
const withAuth = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.route('/')
  .get(withAuth, async (req, res) => {
    try {
      // rend la requette du controller
      const todos = await getTodos(req.userId)
      return res.json(todos)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .post(withAuth, async (req, res) => {
    try {
      await createTodo(req.body, req.userId)
      const todos = await getTodos(req.userId)
      return res.json(todos)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .delete(withAuth, async (req, res) => {
    try {
      if (req.body._id) {
        await deleteTodo(req.body._id)
        const todos = await getTodos(req.userId)
        return res.json(todos)
      } else {
        throw new Error('_id is missing')
      }
    } catch (error) {
      return res.status(500).send(error)
    }
  })

  // je peux utiliser .update()
  .put(withAuth, async (req, res) => {
    await updateTodo(req.body)
    const todos = await getTodos(req.userId)
    return res.json(todos)
  })

module.exports = router
