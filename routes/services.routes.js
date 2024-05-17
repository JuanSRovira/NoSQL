const {Router} = require('express')

const {
    servicePost,
    serviceGet,
    serviceUpdate,
    serviceDelete
} = require('../controllers/serviceController')

const router = Router()

router.post("/", servicePost)
router.get("/", serviceGet)
router.put("/;id", serviceUpdate)
router.delete("/:id", serviceDelete)

module.exports = router