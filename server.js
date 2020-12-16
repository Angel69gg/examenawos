require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const routes = require('./routes/departamento');
app.use(routes);

//CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});
app.post('/placeOrder', function(req, res) {

    console.log("post received");
});
app.get('/', function (req, res) {
  res.send('<h1>Bienvenido a mi servidor rest!</h1>')
})


   mongoose.connect('mongodb://localhost:27017/bd',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   },(err,res)=> {
if (err) throw err;
console.log('Base de datos ONLINE')
});

app.listen(process.env.PORT,()=>{
console.log('el servidor esta corriendo en el puerto 3000')


})