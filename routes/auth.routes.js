const {Router} = require('express')

const {
    authPost

} = require('../controllers/authController')

const router = Router()

router.post("/login", authPost)

module.exports = router