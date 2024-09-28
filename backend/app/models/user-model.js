import {Schema, model} from 'mongoose'

const userSchema = new Schema ({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Moderator', 'User'], default: 'User' },    // Role assigned to the user
}, {timestamps: true})

const User = model('User', userSchema)

export default User