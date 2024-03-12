const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { init } = require('./src/services/db')
// définition du port
const port = 3000

// création de l'application express
const app = express()

// instalation middleware sécurité
app.use(helmet())
app.use(cors())
// log en mieux
app.use(morgan('dev'))

// Middle ware de décodage des requettes
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// connection bdd
init()

// route : /
// req : request
// res : response
app.get('/', (req, res) => {
  res.send('cocou')
})

app.use('/todos', require('./src/routes/todos'))

// lancement de l'api
app.listen(port, () => {
  console.log('server is listening on port : ' + port)
})
