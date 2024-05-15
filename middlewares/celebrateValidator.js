const { celebrate, Segments } = require("celebrate")
const { schema } = require("../validator/userValidator")

const celebrateValidator = celebrate ({ [Segments.BODY]: schema })

module.exports = { celebrateValidator }