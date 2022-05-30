const jwt = require('jsonwebtoken')
const config = require('../../config/index')

class TokenService {
    generateRefreshToken(payload) {
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return refreshToken
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, config.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService