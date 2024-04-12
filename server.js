const express = require("express")
const cors = require("cors")
//Error mio:  los objetos dentro de 'require' necesitan un ("")

class server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3001
        this.middlewares()
    }

    middlewares(){
        //El midleware sirve para recibir datos
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        //public
        this.app.use(express.static('public'))
    }

    listen (){
        this.app.listen(this.port, ()=> {
            console.log(`Esta aplicación corre en el puerto: ${this.port}`)
        })
    }
}

module.exports = server