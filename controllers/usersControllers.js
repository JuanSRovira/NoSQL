const {response, request} = require("express")
const User = require('../models/usersmodels')

//Este user se ocupa en toda la arquitectura de este schema

const createUser = async(req = request, res = response) => {
    try {
    const { body } = req;
    const user = new User(body)
    await user.save()
    res.status(201).json({msg:"Usario creado de manera exitosa", user
    })
    }catch(error){
    res.status(500).json({
        msg: "Algo inesperado a sucedido"
    })
}
    
}

const readUser = async (req, res) => {
    //Para hacer una peticion con await y el find es necesario hacer la funcion asincrona.
    try {
        const { limit = 10 } = req.query
        const queryParam = { active:true }
        const recordLength = await User.countDocuments()
        const user = await User.find(queryParam).limit(Number(limit)).populate("service")
        res.json({
            recordLength, user
        })
        } catch (error) {
        res.status(500).json({
            msg: "Algo inesperado sucedio al leer al usuario", error
        })
    }
    //Aparecio un error comun de NodeJS debido a que habian 2 codigos de
    //mensaje, es decir, 2 const res.json msg: something
}

const updateUser = async(req = request, res) => {
    try {
        const {params, body} = req
        const { userId } = params

        await User.findByIdAndUpdate(userId, body)
        const userToShow = await User.findById(userId)

        res.status(202).json({
            msg: "El usuario se modifico con exito", userToShow
            })
    } catch (error) {
        res.status(500).json({
            msg: "Un error a ocurrido al actualizar el usuario"
        })
    }

}

//Este borrado es uno total, lo cual muchas veces es complicado, por lo que se recomienda el borrado logico
//Que es cambiar el estado de true a false en el registro booleano

const deleteUser = async (req = request, res = response)  => {
    try {
        const {userId} = req.params
        const deleteState = {"active": false}
        // const user =  await User.findByIdAndDelete(userId) 
        await User.findByIdAndUpdate(userId, deleteState) //BORRADO LOGICO 
        const userToShow = await User.findById(userId)
        res.status(202).json({ msg: "Se borro el registro", userToShow})
    } catch (error) {
        res.status(500).json({
            msg: "A ocurrido un error al borrar el usuario"
        })
    }
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}