import User from './UserModel.js'
import bcrypt from 'bcrypt'



export const UserController = {
    register: async (req, res) => {
        try {
            const {firstname, lastname, email, password} = req.body
            if(!firstname || !lastname || !email || !password){
                return res.status(400).json({
                    success: false,
                    message: 'Not all fields have been entered.',
                    data: null
                })
            }
    
            const existingUser = await User.findOne({email: email})
            if(existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'An account already exists with this e-mail',
                    data: null
                })
            }
    
            const salt = await bcrypt.genSalt()
            const passwordHashed = await bcrypt.hash(password, salt)
    
            const newUser = new User({
                firstname,
                lastname,
                email,
                password: passwordHashed
            })
            const savedUser = await newUser.save()
            return res.status(200).json({
                sucess: true,
                message: 'User successfully created',
                data: {
                    id: savedUser.user_id,
                    email: savedUser.email
                }
            })
    
        }catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong.',
                data: null
            })
        }
    },
    delete: async (req, res) => {
        try {
            const result = await User.findOneAndDelete({user_id: req.params.id}).exec()
            if(!result){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${req.params.id}`,
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: `Successfully deleted the document`,
                data: null
            })
        } catch(err){
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong.',
                data: null
            })
        }
    },
    find: async (req, res) => {
        try {
            const user = await User.findOne({user_id: req.params.id}).populate('posts')
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id : ${req.params.id}`,
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: 'We found this document',
                data: user
            })
        } catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                data: null
            })
        }
    },
    findAll: async (req, res) => {
        try {
            const users = await User.find()
            if(users.length === 0){
                return res.status(404).json({
                    success: false,
                    message: 'No documents found',
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Here a list of the documents found',
                data: users
            })
        } catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong',
                error: err.message,
                data: null
            })
        }
    },
    create: async (req, res) => {
        try {
            const { firstname, lastname, email, userType } = req.body

            if(!firstname || !lastname || !email || !userType){
                return res.status(400).json({
                    success: false,
                    message: 'Not all fields have been entered.',
                    data: null
                })
            }

            const existingUser = await User.findOne({email: email})
            if(existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'An account already exists with this e-mail',
                    data: null
                })
            }

            const randomChar = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
            const salt = await bcrypt.genSalt()
            const passwordHashed = await bcrypt.hash(randomChar, salt)

            const newUser = new User({
                firstname,
                lastname,
                email,
                userType,
                password: passwordHashed
            })

            const savedUser = await newUser.save()
            return res.status(200).json({
                sucess: true,
                message: `User successfully created, password ${randomChar}`,
                data: {
                    id: savedUser.user_id,
                    email: savedUser.email
                }
            })


        } catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong',
                data: null
            })
        }
    }
}

