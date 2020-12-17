const express = require('express')
const app = express()
const empleado= require('../models/empleado')


app.get('/empleado/:id', (req, res) => {

    let idEmpleado = req.params.id;
  
    empleado.findById({ _id: idEmpleado })
        .populate('usuario', 'id_usuario')
        .populate('departamento', 'id_departamento')
        .exec((err, empleado) => {
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
                conteo: empleado.length,
                empleado
            });
        });
  
  });
app.post('/empleado',function(req,res){
    let body= req.body;
let emp= new empleado({
  
    id_usuario:body.id_usario,
    id_departamento: body.id_departamento,
    numero_del_puesto: body.numero_del_puesto,
    anios_servicio: body.anios_servicio,
    hora_entrada: body.hora_entrada,
    hora_salida: body.hora_salida,
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
  let body = _.pick(req.body, ['hora_salida', 'hora_entrada', 'nombre_del_puesto','anios_de_servicio']);

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
  empleado.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' }, (err, empDB) => {
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