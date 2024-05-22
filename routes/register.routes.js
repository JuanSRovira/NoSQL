const {Router} = require ('express')
const {registerUser, loginUser} = require('../controllers/registerControllers')

const router = Router()

router.post("/register", registerUser)
router.post("/loginUser", loginUser)

module.exports = router