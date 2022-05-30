const ApiError = require('../errors/apiError')
const tTokenService = require('../service/tokenService/index')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const refreshToken = authorizationHeader.split(' ')[1]
        if(!refreshToken) {
            return next(ApiError.UnauthorizedError())
        } 

        const userData = tTokenService.validateRefreshToken(refreshToken)
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}