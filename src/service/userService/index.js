const bcrypt = require('bcrypt')

const db = require('../../db/index')
const TokenService = require('../tokenService/index')
const config = require('../../config/index')
const UserDto = require('../../dtos/userDto')
const ApiError = require('../../errors/apiError')

class UserService {
    async createUser(first_name, last_name, email, phone, password) {
        const candidat = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if(candidat.rows[email] === email) {
            throw ApiError.BadRequest('User with this email already exists')
        }

        const hashPassword = await bcrypt.hash(password, 7);

        const user = await db.query(
            `INSERT INTO users (first_name, last_name, email, phone, password) values ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, email, phone, hashPassword]
        )
        return user
    }

    async loginUser(email, password) {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if(user.rows[0] == undefined) {
            throw ApiError.BadRequest('This email is not registered')
        }

        const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Invalid password')
        }

        const userDto = new UserDto(user.rows[0]);
        const refreshToken = TokenService.generateRefreshToken({...userDto})

        const userId = user.rows[0].id
        const token = await db.query('SELECT * FROM tokens WHERE userId = $1', [userId])
        if(token.rows[0] !== undefined){
            const userToken = await db.query(
                'UPDATE tokens set refresh_token = $1 WHERE userId = $2 RETURNING *',
                [refreshToken, userId]
            )  
            return userToken
0       }
        else {
            const userToken = await db.query(
                `INSERT INTO tokens (refresh_token, userId) values ($1, $2) RETURNING *`,
                [refreshToken, userId]
            )
            return userToken 
        }
    }

}

module.exports = new UserService()