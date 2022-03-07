import multer from "multer";
import uniqid from 'uniqid';

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        const name = uniqid()
        const extension = MIME_TYPES[file.mimetype]
        cb(null, `${name}.${extension}`)
    }
})

export default multer({storage}).single('image')