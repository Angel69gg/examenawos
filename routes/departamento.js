const express = require('express')
const app = express()
const departamento= require('../models/departamento')


app.get('/departamento', function (req, res) {
  departamento.find({}).exec((err,departamento)=>{
      if(err){
          return res.status(400).json({
              ok: false,
              msg:'ocurrio un error al consultar',
              err
          })
      }
      res.json ({
        ok: true,
        msg: 'lista obtenida con exito',
        conteo: departamento.length,
        departamento
      })
  })
})
app.post('/departamento',function(req,res){
    let body= req.body;
let dep = new departamento({
    prueba: body.prueba

  });
  dep.save((err,depDB)=>{
if (err){
  return res.status(400).json({
      ok: false,
      msg: 'ocurrio un error',
      err
 })
}


    res.json({
        ok: true,
          mensaje: 'Producto Insertado con exito',
          depDB
    })
  })
})
module.exports=app;