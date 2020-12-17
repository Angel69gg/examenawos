const express = require('express')
const app = express()
const usuario= require('../models/usuario')


app.get('/usuario/:id', (req, res) => {

    let idUsuario = req.params.id;
  
    usuario.findById({ _id: idUsuario })
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al listar las categorias',
                    err
                });
            }
  
            res.json({
                ok: true,
                msg: ' listada con exito',
                conteo: usuario.length,
                usuario
            });
        });
  
  });
app.post('/usuario',function(req,res){
    let body= req.body;
let usr= new usuario({
    
    nombre:body.nombre,
    primer_apellido: body.primer_apellido,
    segundo_apellido: body.segundo_apellido,
    edad: body.edad,
    curp: body.curp,
    telefono:body.telefono,
    mail: body.mail,
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
  let body = _.pick(req.body, ['nombre', 'primer_apellido','segundo_apellido','edad','curp','telefono','mail']);

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
  usuario.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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