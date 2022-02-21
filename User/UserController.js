import User from './UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body
        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Not all fields have been entered.'
            })
        }
    }
}