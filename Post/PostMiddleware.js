import multer from "multer";
import bcrypt from 'bcrypt'

const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const name = bcrypt.hashSync(file.originalname.split(' ').join('_'), 5)
        const extension = MIME_TYPES[file.mimetype]
        cb(null, `${name}.${extension}`)
    }
})

export default multer({storage}).single('image')