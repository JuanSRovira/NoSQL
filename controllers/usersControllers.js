const {response, request} = require("express")
const User = require('../models/usersmodels')

//Este user se ocupa en toda la arquitectura de este schema

const createUser = async(req = request, res = response) => {
    try {
    const { body } = req;
    const user = new User(body)
    await user.save()

    res.status(201).json({msg:"Usario creado de manera exitosa",
    user
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
        const user = await User.find(queryParam).limit(Number(limit))
        res.json({
            recordLength,
            user
        })
         } catch (error) {
        res.status(500).json({
            msg: "Algo inesperado sucedio al leer al usuario"
        })
    }
    res.json({msg: "Leer usuarios desde el controller"}) 
}

const updateUser = (req = request, res) => {
    const {params, query} = req
    console.log(query)
    console.log(params)
    res.json({ msg: "Actualizar usuario desde el controller"})
}

const deleteUser = (req, res) => {
    res.json({ msg: "Borrar usuario desde el controller"})
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}