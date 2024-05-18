const {Router} = require ('express')
const {registerUser} = require('../controllers/registerControllers')

const router = Router()

router.post("/", registerUser)

module.exports = router