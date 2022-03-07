import User from '../User/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const AuthController = {
    login: async (req, res) => {
        try {
            const {email, password } = req.body
            if(!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Not all field have been entered',
                    data: null
                })
            }
            
            const user = await User.findOne({email: email})

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'E-mail or password incorrect',
                    data: null
                })
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if(!isPasswordMatch){
                return res.status(404).json({
                    success: false,
                    message: 'E-mail or password incorrect',
                    data: null
                })
            }
            
            const token = jwt.sign({
                id: user.user_id,
            }, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10)
            })

            return res.status(200).json({
                success: true,
                message: 'Successfully connected',
                data: {
                    token,
                    user_id: user.user_id,
                    email: user.email
                }
            })

        } catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                error: err.message,
                data: null
            })
        }
    }
}