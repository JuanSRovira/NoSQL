const {response, request } = require ("express")

//Schema Model

const Service = require('../models/service.models')

//Read 
const serviceGet = async ( req = request, res = response ) => {
    try {
        const queryParam = {active: true}

        const NumeroEntradas = await Service.countDocuments()
        const servicio = await Service.find(queryParam)
        res.status(200).json({
            total: NumeroEntradas, servicio
        })
    } catch (error) {
        res.status(500).json ({
            message: "Algo inesperado a sucedido al leer usuarios"
        })
    }
}

//create

const servicePost = async (req = request, res = response) => { 
    try {
        const { name, active, price } = req.body
        const data = { name, active, price } 

        const service = new Service(data)
        await service.save()

        res.status(200).json({
            message:'Servicio route desde el controller', service
        })
    }   catch (error) {
        res.status(500).json ({
            message:'Un error sucedio al crear el servicio', error
        })
    }
}

//update

const serviceUpdate = async (req = request, res= response) => {
    try {
        const {id} = req.params
        const { name, price, active} = req.body
        const data = { name, price, active}

        await Service.findByIdAndUpdate(id, data)

        res.status(200).json({
            message: 'Exito actualizando el registro', ok:true
        })
    } catch (error) {
        res.status(500).json ({
            message: 'Un error al actualizar el usuario'
        })
    }
}

//delete

const serviceDelete = async ( req = request, res = response ) => {
    try{
        const {id} = req.params
        const falseActive = {active:false} //BORRADO LOGICO
        await Service.findByIdAndUpdate(id, falseActive)

        res.status(200).json({
            message: `el servicio con el id: ${id} ha sido eliminado`
        })

    } catch (error) {
        res.status(500).json({
        message:"Algo salio mal cuando intentabamos eliminar el servicio"
        })
    }
}

module.exports = {
    serviceGet,
    servicePost,
    serviceUpdate,
    serviceDelete
    
}