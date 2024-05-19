const { Router } = require('express')
const {     
    createUser,
    readUser,
    updateUser,
    deleteUser 
} = require('../controllers/usersControllers')
const  { celebrateValidator } = require ("../middlewares/celebrateValidator")
const {validateToken} = require('../middlewares/jwtValidator')

const router = Router()

router.post("/",validateToken("cambiame-por-algo-seguro"), celebrateValidator, createUser)
router.get("/", readUser)
router.put("/:userId", updateUser)
router.delete("/:userId", deleteUser)


module.exports = router