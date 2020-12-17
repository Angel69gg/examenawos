const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let usuarioSchema= new Schema ({

nombre:{
    type: String
},
primer_apellido:{
    type: String
},
segundo_apellido:{
    type: String
},
edad:{
    type: Number
},
curp:{
    type: String,
    unique: true
},
telefono:{
    type: Number
},
mail:{
    type: String
},
activo:{
    type: Boolean
}

})
module.exports= mongoose.model('usuario',usuarioSchema)