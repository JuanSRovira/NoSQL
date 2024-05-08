const mongoose =  require('mongoose')


class Database {
    constructor(){
        this.connection = process.env.MONGO_CNN_DEV
    }
    async dbConnection(){
        try {
            mongoose.connect(this.connection, {
            })
            console.log('Conectados a la base de datos')
        } catch (error){
            console.log(error)
            throw new Error ('Error al conectarse a la base de datos')
        }
    }
}

module.exports = Database