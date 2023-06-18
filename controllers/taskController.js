const TaskModel = require('../models/taskModel')
const UserModel = require('../models/userModel')
const {CustomError} = require('../errors/customError')
const { StatusCodes } = require('http-status-codes')


const getTasks = async (req,res) =>{
    const {userID} = req.user
    const tasks = await TaskModel.find({createdBy : userID})
    res.status(200).json({tasks})
   
}
const getTask = async (req,res) =>{
    const {userID} = req.user
    const {id : taskID} = req.params
    const task = await TaskModel.findOne({createdBy : userID,_id:taskID})
    if(task)
        res.status(StatusCodes.OK).json({task})
    else 
        throw new CustomError(`No task with id : ${taskID}`,StatusCodes.NOT_FOUND)
}

const createTask = async (req,res) =>{
    const {userID} = req.user
    const task = await TaskModel.findOne({createdBy : userID,...req.body})
    if(task){
        throw new CustomError(`Task already exists`,StatusCodes.BAD_REQUEST)
    }
    else {
        const task = await TaskModel.create({createdBy : userID,...req.body})
        res
            .status(StatusCodes.OK)
            .json(task)
        }
}

const updateTask = async (req,res) =>{
    const {userID} = req.user
    const {id : taskID} = req.params
    const task = await TaskModel.findOneAndUpdate({_id : taskID,createdBy : userID},{...req.body},{
        new : true, // return the new task
        runValidators : true // run validators on the new task
    })
    if(!task){
        throw new CustomError(`No task with id : ${taskID}`,StatusCodes.NOT_FOUND)
    }
    else {
        res.status(StatusCodes.OK).json({task})
    }
    
}

const deleteTask = async (req,res) =>{
    const {userID} = req.user
    const {id : taskID} = req.params
    const task = await TaskModel.findOneAndDelete({_id : taskID,createdBy : userID})
    if(!task){
        throw new CustomError(`No task with id : ${taskID}`,StatusCodes.NOT_FOUND)
    }
    else {
        res.status(StatusCodes.OK).json({'success':true,'data':'Succefuly deleted'})
    }

}

const deleteUser = async (req,res) =>{
    const {userID} = req.user
    await TaskModel.deleteMany({createdBy : userID})
    const deletedUser = await UserModel.findByIdAndDelete(userID)
    res.status(StatusCodes.OK).json(deletedUser)
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,deleteUser
}