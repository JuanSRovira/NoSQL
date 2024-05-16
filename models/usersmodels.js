const { Schema, model } = require ("mongoose")

const UserSchema = Schema({
    userName:{
        type: String,
        required: [true, "El username es obligatorio"],
        unique: true,
        enum: ['NORMAL', 'PREMIUM']
    },
    email:{
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: [true, "El numero telefonico es obligatorio"]
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
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.service){
        const defaultService = await Service.findOne({name: 'NORMAL'})
        this.service = defaultService._id
    }
    next()
})

UserSchema.method('getInitial', function(){
    return this.userName[0]
    
})

module.exports = model('User', UserSchema)