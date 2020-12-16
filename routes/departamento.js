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
    _id: body._id,
    id_jefe_de_area:body.id_jefe_de_area,
    nombre: body.nombre,
    numero_empleados: body.numero_empleados,
    extension_telefonica: body.extension_telefonica,
    activo: body.activo
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
app.put('/departamento/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['descripcion', 'usuario']);

  departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
      (err, depDB) => {
          if (err) {
              return res.status(400).json({
                  ok: false,
                  msg: 'error al momento de actualizar',
                  err
              });
          }
          res.json({
              ok: true,
              msg: 'Categoria actualizada con exito',
              depDB
          });
      });
});
app.delete('/departamento/:id', function(req, res) {

  let id = req.params.id;
  deparmento.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, depDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              msg: 'Ocurrio un error al momento de eliminar',
              err
          });
      }
      res.json({
          ok: true,
          msg: 'Porducto eliminado con exito',
          depDB

      });
  });
});

module.exports=app;