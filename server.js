import http from 'http'
import app from './app.js'
import db_connect from './db/db.js'
import 'dotenv/config'

const normalizePort = val => {
    const port = parseInt(val, 10)

    if(isNaN(port)) { return val }
    if(port >= 0) {
        return port
    }
    return false
}


db_connect()
const port = normalizePort(process.env.PORT || '3000')

const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port : ${port}`
    switch(error.code){
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already use.`)
            process.exit(1)
            break
        default:
            throw error
    }
}

app.set('port', port)
const server = http.createServer(app)
server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port : ${port}`
    console.log(`Listening on ${bind}`)
})

server.listen(port)