const Todo = require('../models/Todo')

async function getTodos () {
  // select le document en foncton de mon model
  const todos = await Todo.find()
  return todos
}

async function deleteTodo(idTodo){
  const todo = await Todo.deleteOne({_id:idTodo})
  console.log(todo)
  return todo
}

module.exports = {
  getTodos,
  deleteTodo
}
