const controller = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


module.exports = (app) => {
    app.post('/users', controller.createUser)
    app.post('/login', controller.loginUser)
    app.get('/users/:id', authMiddleware ,controller.getUser)
    app.put('/users/:id', authMiddleware ,controller.updateUser)
}