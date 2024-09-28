import User from "../models/user-model.js";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const usersCltr = {}

usersCltr.register = async (req, res) => {
//check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

// save record to db

    const {email, password} = req.body
    try{
        const userCount = await User.countDocuments()
        const user = new User({email, password})
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(user.password, salt)
        user.password = hash
        if(userCount == 0) {
            user.role = 'admin'
        }
        await user.save()
        return res.status(201).json(user)

    }catch(err){
        console.log(err)
        return res.status(500).json('something went wrong')
    }
}

usersCltr.login = async (req, res) => {
//check for errors
const errors = validationResult(req)
if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
}

// destructure email and password

const {email, password} = req.body

try{
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(404).json({error: 'invalid email or password'})
    } 
    //compare password
    const isValid = await bcryptjs.compare(password, user.password)
    if(!isValid) {
        return res.status(404).json({error: 'invalid email or password'})
    } 
    //generate token
    const tokenData = {userId: user._id, role: user.role}
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '7d'})
    return res.status(200).json({token: token})

}catch(err){
    console.log(err)
    return res.status(500).json('something went wrong')
}

}

usersCltr.account = async (req, res) => {
    try{
        const user = await User.findById(req.userId)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
}

usersCltr.list = async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}

usersCltr.destroy = async (req, res) => {
    try{
        const id = req.params.id
        if (id == req.userId) {
            return res.status(400).json ({error: 'you cannot delete your own account'})
        }
        const user = await User.findByIdAndDelete(id)
        
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }
        return res.json(user)
        
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
    
}

usersCltr.changeRole = async(req, res) =>{
    try{
        const id = req.params.id
        const body = req.body
        if (id == req.userId) {
            return res.status(400).json ({error: 'you cannot change your own role'})
        }

        const user = await User.findByIdAndUpdate(id, body, {new:true})
        res.json(user)
        
    }catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}
export default usersCltr