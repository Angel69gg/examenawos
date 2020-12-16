const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let departamentoSchema= new Schema ({
prueba: {
type: String

}


})
module.exports= mongoose.model('departamento',departamentoSchema)