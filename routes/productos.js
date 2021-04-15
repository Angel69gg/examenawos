const express = require('express')
const _ = require('underscore')
const app = express()
const productos= require('../models/productos')


app.get('/productos/:id', (req, res) => {

    let idProducto = req.params.id;
  
    productos.findById({ _id: idProducto})
        .populate('usuario', 'id_usuario')
       
        .exec((err, productos) => {
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
                conteo: productos.length,
                productos
            });
        });
  
  });
app.post('/productos',function(req,res){
    let body= req.body;
let prod= new productos({

    nombre: body.nombre,
    precioUni: body.precioUni,
    categoria: body.categoria,
    disponible: body.disponible,
    usuario: body.usuario,
    
  });
  prod.save((err,prodDB)=>{
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
          prodDB
    })
  })
})
app.put('/productos/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'precioUni', 'disponible']);

  productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
      (err, prodDB) => {
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
              prodDB
          });
      });
});
app.delete('/productos/:id', function(req, res) {

  let id = req.params.id;
  productos.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, prodDB) => {
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
          prodDB

      });
  });
});

module.exports=app;