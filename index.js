require('dotenv').config()
// pqueño error, el .config debe tener un ()
const Server = require('./server')

const server = new Server()

server.listen()
