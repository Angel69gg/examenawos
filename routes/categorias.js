const express = require('express')
const _ = require('underscore')
const app = express()
const categorias= require('../models/categorias')


app.get('/categoria/:id', (req, res) => {

  let idCategoria = req.params.id;

  categorias.findById({ _id: idCategoria })
      .populate('usuario', 'usuario')
      .exec((err, categorias) => {
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
              conteo: categorias.length,
              categorias
          });
      });

});

app.post('/categoria',function(req,res){
    let body= req.body;
let cat = new categorias({
    nombre: body.nombre,
    usuario: body.usuario
  });
  cat.save((err,catDB)=>{
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
          catDB
    })
  })
})
app.put('/categoria/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre']);

  categorias.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
      (err, catDB) => {
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
              catDB
          });
      });
});
app.delete('/categoria/:id', function(req, res) {

  let id = req.params.id;
  categorias.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
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
          catDB

      });
  });
});

module.exports=app;