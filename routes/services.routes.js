const {Router} = require('express')

const {
    servicePost,
    serviceGet,
    serviceUpdate,
    serviceDelete
} = require('../controllers/serviceController')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post("/", validarJWT, servicePost)
router.get("/", serviceGet)
router.put("/;id", serviceUpdate)
router.delete("/:id", serviceDelete)

module.exports = router