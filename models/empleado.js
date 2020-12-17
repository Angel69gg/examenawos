const mongoose = require('mongoose');
const { schema } = require('./departamento');
let Schema = mongoose.Schema;
let empleadoSchema= new Schema ({

id_usuario:{
    type: Schema.Types.ObjectId,
    ref:'usuario'
},
id_departamento:{
    type: Schema.Types.ObjectId,
    ref: 'departamento'
},
nombre_del_puesto:{
    type: String
},
anios_servicio:{
    type: Number
},
hora_entrada:{
    type: Number
},
hora_salida:{
    type: Number
},
activo:{
    type: Boolean
}


})
module.exports= mongoose.model('empleado',empleadoSchema)