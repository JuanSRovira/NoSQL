function validatePost (schema) {
// PARA SER UN MIDDLEWARE DEBE TENER 3 VALORES (REQ, RES, NEXT)
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(403).json({
                msg: error.details[0].message
                /*
                Me aparecio un error; al colocar el string "ha ocurrido un error"
                me devolvia el string, en lugar de presentar en consola los errores 
                propios de la validacion, es decir, la consola presentaba el mensaje en
                lugar de: "El nombre requiere mas de 3 caracteres, el email es tipo email y requiere un @ etc..."
                */
            })
        }
        next()
    }
}

module.exports = { validatePost }