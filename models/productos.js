const mongoose = require('mongoose');
const { schema } = require('./categorias');
let Schema = mongoose.Schema;
let productoSchema= new Schema ({


nombre:{
    type: String
},
precioUni:{
    type: Number
},
categoria:{
     type: Schema.Types.ObjectId,
    ref:'categoria'
},
disponible:{
    type: Boolean
},
usuario:{
    type: Schema.Types.ObjectId,
    ref:'usuario'
}



})
module.exports= mongoose.model('productos',productoSchema)