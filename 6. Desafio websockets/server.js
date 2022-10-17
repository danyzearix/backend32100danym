const { Socket } = require("engine.io");
const express = require("express"); //Instanciar framework de express
const app = express();  //Ejecutar express
const http = require("http");   //Instanciar http
const { engine } = require('express-handlebars');
const path = require('path');
const server = http.createServer(app);  //Crear un nuevo servidor http basico pero instanciando express dentro de el
const { Server } = require("socket.io");    //Instanciar la dependencia de socket io en un servidor 
const io = new Server(server);  //Incorporar Socket IO dentro del servidor http que esta corriendo express
const fs  = require("fs");

//Array de mensaje

//Middlewares

//Configuracion de motor de plantillas
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
  }));
  
  app.set('views', './views');
  app.set('view engine', 'hbs');
  app.use(express.static('public'));

  let productos = [];
  let messages = [];

  console.log(productos);
//Escribir el archivo de productos
  function writeFS(params) {
    if (params === [""]) {
      fs.writeFileSync("productos.txt", params)
    }else { fs.writeFileSync("productos.txt", JSON.stringify(params))}
  };
//Escribir archivo de chat
  function writeCHAT(params) {
    if (params === [""]) {
      fs.writeFileSync("chat.txt", params)
    }else { fs.writeFileSync("chat.txt", JSON.stringify(params))}
  }
//Leer archivo de productos
  function readTxt(params) {
    if (productos.length === 0) {
      console.log("No hay productos en el array")
    } else {
      let persistencia = fs.readFileSync("./productos.txt","utf-8")
        let persisParse = JSON.parse(persistencia)
        console.log(persistencia)
        return persisParse;}
};

function readCHAT(params) {
  if (messages.length === 0) {
    console.log("Sin historial de chats")
  } else {
    let persistenciaChat = fs.readFileSync("./chat.txt","utf-8")
      let persisChatParse = JSON.parse(persistenciaChat)
      console.log(persistenciaChat)
      return persisChatParse;}
};



  io.on('connection', function (socket) {
    let id = socket.id
    console.log(`Nueva conexion en el socket ${id}`)
    
    socket.on("chatMessages", (message) => {
      messages.push(message)
      console.log(messages)
      io.emit("renderChat", messages);
      writeCHAT(messages)
      });
    io.emit("recoverChat", (readCHAT()));    ///Este evento deberia emitir los mensajes anteriores
    
    socket.emit("historial", readTxt()); //Esta funcion reconectar constantemente el socket 
    
    socket.on("productosLive", (info) => {
      productos.push(info)
      console.log(productos)
      writeFS(productos);
      io.emit("productosLive", info);
      io.emit("render", productos);
  });

 });

app.get('/', (req, res) => {
    res.render('main', {});
  });

  server.listen(3000, () => {
	console.log("Ok");
});

