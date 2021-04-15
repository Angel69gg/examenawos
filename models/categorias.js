
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let categoriaSchema= new Schema ({

nombre:{
    type: String,
    required: [true, 'nombre necesario']
},
usuario:{
    type: Schema.Types.ObjectId,
    ref:'usuario'
}


})
module.exports= mongoose.model('categoria',categoriaSchema)