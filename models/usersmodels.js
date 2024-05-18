const { Schema, model } = require ("mongoose")
const Service = require('./service.models')

const AddressSchema = Schema ({
    street: {
        type: String
    },
    number: {
        type: Number
    },
    city: {
        type: String
    }
})

const UserSchema = Schema({
    userName:{
        type: String,
        required: [true, "El username es obligatorio"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    phoneNumber:{
        type: Number
    },
    password:{
        type: String,
        required: [true, "El password es requerido"]
    },
    active:{
        type: Boolean,
        default: true
    },
    inicial:{
        type: String,
        default: function() {
            return this.userName[0]
        }
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    address: {
        type: AddressSchema,
    },
})

UserSchema.pre('save', async function(next) {
    if (!this.service){
        const defaultService = await Service.findOne({name: 'NORMAL'})
        console.log(defaultService)
        this.service = defaultService._id
    }
    next()
})

UserSchema.method('getInitial', function(){
    return this.userName[0]
    
})

module.exports = model('User', UserSchema)