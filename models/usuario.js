const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let usuarioSchema= new Schema ({


nombre:{
    type: String
},
email:{
    type: String
},
password:{
    type: String
},
google:{
    type: Boolean
},
role:{
    type: String,
},
img:{
    type: String
},
estado:{
    type: Boolean
}

})
module.exports= mongoose.model('usuario',usuarioSchema)