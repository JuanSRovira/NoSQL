const Joi = require("joi")

const schema = Joi.object().keys({
    userName: Joi.string().min(3).max(30).required().messages({
        "string.base": "El nombre de usuario debe ser un string",
        "string.empty": "El username no debe estar vacio",
        "string.min": "El username debe tener al menos {#limit} caracteres"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "El email debe ser un un email valido",
        "string.empty": "El email no debe estar vacio",
    }),
    phoneNumber: Joi.number().min(10).required().messages({
        "string.base": "El numero de telefono debe ser un numero",
        "string.empty": "El numero de telefono no debe estar vacio",
        "string.min": "El numero de telefono debe tener al menos {#limit} caracteres"
    }) ,
    password: Joi.string().min(8).max(30).required().messages({
        "string.base": "La contraseña debe ser un string",
        "string.empty": "La contraseña no debe estar vacia",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres"
    }),
    service: Joi.string()
})

module.exports = { schema }

//ERROR EN EL PHONE NUMBER: 
//Coloque un parametro maximo de 10 en lugar de uno minimo
//limitando enormemente el proceso