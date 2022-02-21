import User from "../User/UserModel.js"
import jwt from 'jsonwebtoken'



const AuthMiddleware = {
    isAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false
    
            if(!token) {
                return res.status(401).json({
                    success: false,
                    message: 'No authentification token, authorization denied',
                    data: null
                })
            }
    
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if(!verified){
                return res.status(401).json({
                    success: false,
                    message: 'Token verification failed, authorization denied',
                    data: null
                })
            }
    
            const user = await User.findOne({user_id: verified.id})
            if(!user){
                return res.status(401).json({
                    success: false,
                    message: 'Token verification failed, authorization denied',
                    data: null
                })
            } 
    
            req.user = user
            next()
    
        } catch(err) {
    
            if(err.message === 'jwt expired'){
                return res.status(401).json({
                    success: false,
                    message: 'Session expired, please try to login',
                    data: null
                })
            }
    
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong',
                data: null
            })
        }
    },
    isAdmin: async (req, res, next) => {
        const { userType } = req.user
        if(userType !== 'admin'){
            return res.status(401).json({
                success: false,
                message: 'Authorization denied',
                data: null
            })
        } else {
            next()
        }
    }
}

export default AuthMiddleware


