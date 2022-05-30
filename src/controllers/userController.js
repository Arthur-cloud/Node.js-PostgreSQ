const ApiError = require('../errors/apiError')
const db = require('../db/index')
const UserService = require('../service/userService/index')
const { userValidation } = require('../validations/userValidation')
const io = require('socket.io-client')

class UserController {
    async createUser(req, res, next) {
        try {
            const {first_name, last_name, email, phone, password} = req.body
            const userData = await UserService.createUser(first_name, last_name, email, phone, password)
            return res.json(userData.rows[0])
        } catch (error) {
            next(error)
        }
    }

    async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.loginUser(email, password)
            return res.json(userData.rows[0])
        } catch (error) {
            next(error)
        }
    }

    async getUser(req, res, next) {
        try {
            const id = req.params.id
            const user = await db.query('SELECT * FROM users WHERE id = $1', [id])
            res.json(user.rows[0])
        } catch (error) {
            next(error)
        } 
    }

    async updateUser(req, res, next) {
        try {
            const {error} = userValidation(req.body)
            if(error) {
                console.log(error)
                return ApiError.BadRequest('Validation error')
            }
            
            const id = req.params.id
            const {first_name, last_name, email, phone, password} = req.body

            const user = await db.query(
                'UPDATE users set first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *',
                [first_name, last_name, email, phone, password, id]
            )

            const socket = io(`http://localhost:5000/users/${id}`)
            socket.on('pushNotification', function (data) {
                console.log(data);
                Push.create("Notification", {
                    body: data.msg, //HTML
                });
              });
            res.json(user.rows[0])
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()