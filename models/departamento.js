
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let departamentoSchema= new Schema ({
id_jefe_de_area:{
type: Schema.Types.ObjectId,
ref: 'empleado'
},
nombre:{
    type: String,
    required: [true, 'nombre necesario']
},
numero_empleados:{
    type: Number
},
extension_telefonica:{
    type: Number
},
Activo:{
    type: Boolean
}


})
module.exports= mongoose.model('departamento',departamentoSchema)