const express = require("express");
const app = express();
const port = 8080;
const route = require ("./controllers/index");
//Middlewares
app.use (express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static(__dirname + "/public")); //Path Absoluto
app.use("/api", route);

//Server listen
const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
 });
 server.on("error", error => console.log(`Error en servidor ${error}`));
 
//Server root
app.get("/", (req , res) => {
    res.send("<h1>Bienvenido al servidor ATRIA </h1>");
});