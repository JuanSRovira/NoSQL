const { Router } = require('express')

const {     
    createUser,
    readUser,
    updateUser,
    deleteUser 
} = require('../controllers/usersControllers')

// Me aparecio un error porque no coloque el {create user} dentro de los corchetes
const router = Router()

router.post("/", createUser)
router.get("/", readUser)
router.put("/:userId", updateUser)
router.delete("/:userId", deleteUser)


module.exports = router