const { Router } = require('express')
const {     
    createUser,
    readUser,
    updateUser,
    deleteUser 
} = require('../controllers/usersControllers')

const  { celebrateValidator } = require ("../middlewares/celebrateValidator")

const router = Router()

router.post("/",celebrateValidator , createUser)
router.get("/", readUser)
router.put("/:userId", updateUser)
router.delete("/:userId", deleteUser)


module.exports = router