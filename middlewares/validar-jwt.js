const {response, request} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/usersmodels')

const validarJWT = async( req = request, res = response, next) => {
    const token = req.header("x-token") 
    if (!token) {
        return res.status(401).json({
            msg: "No existe el token - Dato no existente"
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findBy(id)
        if(!user) {
            return res.status(401).json({
                msg: "El usuario no existe en la BD"
            })
        }

            req.usuario = user

            next()

    } catch (error) {
        return res.status(401).json({
            msg: "El token no es valido"
        })
    }
}

module.exports = {
    validarJWT
}