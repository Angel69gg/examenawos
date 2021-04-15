const express = require('express')
const _= require ('underscore')
const app = express()
const usuario= require('../models/usuario')
const bycrypt= require('bcrypt')



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
app.post('/usuarios',function(req,res){
    let body= req.body;
let usr= new usuario({
    
    nombre:body.nombre,
    email: body.email,
    password: bycrypt.hashSync(body.password,10),
    google: body.google,
    role: body.role,
    img:body.img,
    estado: body.estado,
   
  
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
          mensaje: 'Usuario Insertado con exito',
          usrDB
    })
  })
})
app.put('/usuarios/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email','google','role','img','estado']);

  usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
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
app.delete('/usuarios/:id', function(req, res) {

  let id = req.params.id;
  usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              msg: 'Ocurrio un error al momento de eliminar',
              err
          });
      }
      res.json({
          ok: true,
          msg: 'usuario eliminado con exito',
          usrDB

      });
  });
});

module.exports=app;