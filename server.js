const express = require("express")
const cors = require("cors")
//Error mio:  los objetos dentro de 'require' necesitan un ("")
const Database = require('./db/config')


class server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3001
        this.database = new Database()
        this.usersPath = '/api/usuarios'
        //middleware
        this.middlewares()
        //base de datos
        this.dbConnection()
        //Especificar rutas
        this.router()
    }

async dbConnection(){
    await this.database.dbConnection()
}

    middlewares(){
        //El midleware sirve para recibir datos
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        //public
        this.app.use(express.static('public'))
    }

    router(){
        this.app.use(this.usersPath, require('./routes/user.routes'))
    }

    listen (){
        this.app.listen(this.port, ()=> {
            console.log(`Esta aplicación corre en el puerto: ${this.port}`)
        })
    }
}

module.exports = server