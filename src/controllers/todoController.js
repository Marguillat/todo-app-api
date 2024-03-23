const Todo = require('../models/todo')

async function getTodos (userId) {
  // select le document en foncton de mon model
  const todos = await Todo.find({
    user: { $eq: userId }
  })
  return todos
}

async function getTodosOfStatus (userId, statusParam) {
  const todos = await Todo.find({
    user: { $eq: userId },
    status: { $eq: statusParam }
  })
  return todos
}

async function getTodosNotOfStatus (userId, statusParam) {
  const todos = await Todo.find({
    user: { $eq: userId },
    status: { $ne: statusParam }
  })
  return todos
}
async function deleteTodo (idTodo) {
  const todo = await Todo.deleteOne({ _id: idTodo })
  console.log(todo)
  return todo
}

async function updateTodo (updatedTodo) {
  const filter = { _id: updatedTodo._id }
  const update = updatedTodo
  // const {todo}
  const todo = await Todo.findOneAndUpdate(filter, update, {
    new: true
  })
  return todo
}

async function createTodo (todo, userId) {
  try {
    const _todo = new Todo({
      title: todo.title,
      description: todo.description,
      status: todo.status,
      important: todo.important,
      user: userId
    })
    await _todo.save()
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getTodos,
  deleteTodo,
  updateTodo,
  createTodo,
  getTodosOfStatus,
  getTodosNotOfStatus
}
