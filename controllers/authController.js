const {response, request } = require ("express") 
const User = require("../models/usersmodels")
const brcyptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

const authPost = async (req = request, res = response) => { 
    const { email, password } = req.body
    try {

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: "usuario no encontrado"
            })
        }

        const validPassword = brcyptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }

        res.status(200).json({
            message: "Auth Route Aproved by controller", user,
            token:generateToken(user._id)
        })
    }   catch (error) {
        res.status(500).json ({
            message:'Un error sucedio al crear el servicio', error
        })
    }
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '60m'
    })
}

module.exports = {
    authPost
}