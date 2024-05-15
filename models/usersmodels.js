const { Schema, model } = require ("mongoose")

const UserSchema = Schema({
    userName:{
        type: String,
        required: [true, "El username es obligatorio"],
        unique: true
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
    }
})

UserSchema.method('getInitial', function(){
    return this.userName[0]
    
})

module.exports = model('User', UserSchema)