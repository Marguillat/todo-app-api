const mongoose = require('mongoose')

async function init () {
  try {
    await mongoose.connect(
      'mongodb+srv://todo-app:X4k2c3JUoL4p66Kw@todo-cluster.0lggykw.mongodb.net/Todos?retryWrites=true&w=majority&appName=todo-Cluster'
    )
    console.info('mongoDB connected')
  } catch (error) {
    console.error(error)
  }
}

function close () {
  mongoose.connection.close()
}

// export
module.exports = { init, close }
