const { CustomError } = require('../errors/customError')
const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomError)
        return res.status(err.errorStatus).json({ err: err.message })
    if (err.name === 'CastError')
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Task id should be a string of 12 charactere' })
    if (err.code && err.code === 11000)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: `Email already used, please choose another` })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Something went wrong' })
}

module.exports = errorHandler