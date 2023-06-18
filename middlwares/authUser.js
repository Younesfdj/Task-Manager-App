const { CustomError } = require('../errors/customError')
const jwt = require("jsonwebtoken")
const {StatusCodes} = require('http-status-codes')

module.exports.authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new CustomError("You are logged out, please log in first", StatusCodes.BAD_REQUEST)
    const authToken = authHeader.split(" ")[1]
    try {
        const { userID, name } = jwt.verify(authToken, process.env.SECRET_JWT)
        req.user = { userID, name }
        next()
    } catch (error) {
        throw new CustomError(error, StatusCodes.UNAUTHORIZED)
    }
}