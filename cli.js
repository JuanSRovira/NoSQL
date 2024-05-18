require('dotenv').config();
const Database = require('./db/config')
const User = require('./models/usersmodels')
const Service = require('./models/service.models')

const repl = require('repl')

const saludar = () => {
    console.log("Hola")
}
const database = new Database();
database.dbConnection();

const replServer = repl.start();
replServer.context.saludar = saludar
replServer.context.User = User
replServer.context.db = database
replServer.context.Service = Service