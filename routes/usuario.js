const express = require('express')
const app = express()
const usuario= require('../models/usuario')


app.get('/usuario', function (req, res) {
  usuario.find({}).exec((err,usuario)=>{
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
        conteo:usuario.length,
        usuario
      })
  })
})
app.post('/usuario',function(req,res){
    let body= req.body;
let usr= new usuario({
    _id: body._id,
    id_jefe_de_area:body.id_jefe_de_area,
    nombre: body.nombre,
    numero_empleados: body.numero_empleados,
    extension_telefonica: body.extension_telefonica,
    activo: body.activo
  });
  usr.save((err,usrDB)=>{
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
          usrDB
    })
  })
})
app.put('/usuario/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['descripcion', 'usuario']);

  empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
      (err, usrDB) => {
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
              usrDB
          });
      });
});
app.delete('/usuario/:id', function(req, res) {

  let id = req.params.id;
  usuario.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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
          usrDB

      });
  });
});

module.exports=app;