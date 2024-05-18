const { response, request } = require('express')
const User = require('../models/usersmodels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req = request, res = response) => {
    try {
        const {userName, password, email} = req.body
        const user = await User.findOne({ userName })
        if(!user) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hashSync(password, salt)
            const user = new User({ userName, email, password: hashedPassword})
            await user.save()

            res.status(201).json({
                message: "El usuario fue creado correctamente"
            })
        } else {
            res.status(403).json({
                message: "El nombre del usuario ya esta registrado"
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "Algo ocurrio en el servidor, algo malo...", error
        })
        
    }
}

const loginUser = async (req = request, res = response) => {
    const { userName, password } = req.body
    
    const user = await User.findOne({  userName })
    if(!user) {
        return res.status(403).json({
            msg: "El usuario no fue encontrado"
        })
    }

    const correctPassword = bcrypt.compareSync( password, user.password)

    if(correctPassword) {
        const token = jwt.sign({ id: user._id, userName: user.userName}, "cambiame-por-algo-seguro")
        res.status(200).json({
            token
        })
    } else {
        res.status(403).json({
            msg: "La contraseña es incorrecta"
        })
    }

}



module.exports = {
    registerUser, 
    loginUser
}