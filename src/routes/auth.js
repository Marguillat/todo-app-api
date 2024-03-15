const { loginUser, registerUser } = require('../controllers/authController')

const router = require('express').Router()

router.route('/login')
  .post(async (req, res) => {
    try {
      const credentials = req.body
      loginUser(credentials, (error, result) => {
        if (error) {
          return res.status(403).send(error)
        }

        return res.send(result)
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

router.route('/register')
  .post(async (req, res) => {
    try {
      const credentials = req.body
      // j'attend la fin de register sinon erreur 500
      await registerUser(credentials)
      // je log le nouveau user après l'avoir créé sur la base
      loginUser(credentials, (error, result) => {
        if (error) {
          return res.status(403).send(error)
        }

        return res.send(result)
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
