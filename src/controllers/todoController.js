const Todo = require('../models/Todo')

async function getTodos () {
  // select le document en foncton de mon model
  const todos = await Todo.find()
  return todos
}

module.exports = {
  getTodos
}
