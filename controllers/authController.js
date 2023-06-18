const { CustomError } = require('../errors/customError')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv')
const {StatusCodes} = require('http-status-codes')

module.exports.login = async (req, res) => {
    const {password, email } = req.body
    if (!email | !password)
        throw new CustomError('Something is missing', StatusCodes.BAD_REQUEST)

    const user = await userModel.findOne({ email:email})
    if (!user)
        throw new CustomError("User doesnt exist", StatusCodes.NOT_FOUND)
    
    const isCorrectPassword = user.comparePassword(password)
    if(!isCorrectPassword)
        throw new CustomError("Wrong password!",StatusCodes.BAD_REQUEST)
    
    const token = jwt.sign({ userID: user._id, name: user.name }, process.env.SECRET_JWT, {
        expiresIn: process.env.JWT_EXP
    })

    res.status(200).json({ user: { name: user.name }, token })
}

module.exports.register = async (req, res) => {
    const { name, password, email } = req.body
    const user = await userModel.create({ name, password, email })
    const token = jwt.sign({ userID: user._id, name: user.name }, process.env.SECRET_JWT, {
        expiresIn: process.env.JWT_EXP
    })
    res.status(200).json({ user: { name: user.name }, token })
}
