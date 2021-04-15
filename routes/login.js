const express = require('express')
const app = express()
const usuario= require('../models/usuario')
const bycrypt= require('bcrypt')



app.post('/login', (req,res)=>{
let body= req.body;

usuario.findOne({email: body.email ,estado: true}, (err,usrDB) =>{
    if(err){
        return res.status(400).json({
            ok: false,
            msg: 'ocurrio un error al momento del logueo',
            err
        });
    }
    if(!usrDB){
        return res.status(400).json({
            ok:false,
            msg: 'mail incorrecto o inexistente, intente de nuevo'
        });
    }
    if(!bycrypt.compareSync(body.password,usrDB.password)){
        return res.status(401).json({
            ok:false,
            msg: ' contrasena incorrecta, intentelo de nuevo'
        });
    }
    res.json({
        ok:true,
        msg: `Bienvenido ${usrDB.nombre}`,
        usrDB
    })
})

})

module.exports= app;