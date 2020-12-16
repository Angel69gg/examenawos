const express = require('express')
const app = express()
const empleado= require('../models/empleado')


app.get('/empleado', function (req, res) {
  empleado.find({}).exec((err,empleado)=>{
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
        conteo: empleado.length,
        empleado
      })
  })
})
app.post('/empleado',function(req,res){
    let body= req.body;
let emp= new empleado({
    _id: body._id,
    id_jefe_de_area:body.id_jefe_de_area,
    nombre: body.nombre,
    numero_empleados: body.numero_empleados,
    extension_telefonica: body.extension_telefonica,
    activo: body.activo
  });
  emp.save((err,empDB)=>{
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
          empDB
    })
  })
})
app.put('/empleado/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['descripcion', 'usuario']);

  empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
      (err, empDB) => {
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
              empDB
          });
      });
});
app.delete('/empleado/:id', function(req, res) {

  let id = req.params.id;
  empleado.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, empDB) => {
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
          empDB

      });
  });
});

module.exports=app;