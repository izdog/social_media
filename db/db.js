import mongoose from 'mongoose'
import 'dotenv/config'

const db_connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Successfully connected to DB')
    } catch(err) {
        console.error(`Error : ${err.message}`)
        process.exit(1)
    }
}

export default db_connect