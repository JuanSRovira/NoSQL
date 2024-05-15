const { Router } = require('express')
const {     
    createUser,
    readUser,
    updateUser,
    deleteUser 
} = require('../controllers/usersControllers')
// Me aparecio un error porque no coloque el {create user} dentro de los corchetes

//const { validatePost } = require('../middlewares/validatorSimple')
//const { schema } = require('../validator/userValidator')
const  { celebrateValidator } = require ("../middlewares/celebrateValidator")

const router = Router()

router.post("/",celebrateValidator ,createUser)
router.get("/", readUser)
router.put("/:userId", updateUser)
router.delete("/:userId", deleteUser)


module.exports = router