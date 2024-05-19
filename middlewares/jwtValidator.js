const jwt = require("jsonwebtoken")

const validateToken = (secret) => {
  return (req, res, next) => {

    const { authorization } = req.headers
    token = authorization.split(" ")[1]

    jwt.verify(token, "cambiame-por-algo-seguro")

    const payload = jwt.verify(token, secret)
    const isAdmin = payload.userName === "Paco"


        if (isAdmin) {
            next()
        } else {
            return res.status(403).json({
                msg: "El usuario no es administrador"
            })
        }


    }
}

module.exports = {
    validateToken
}