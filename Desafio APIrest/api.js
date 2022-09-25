const express = require('express')
const { Server } = require('http')
const app = express()
const port = 8080
const route = require ("./routes/index")
//Middlewares
app.use (express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public")) //Path Absoluto
app.use  ("/api", route)
//Server listen
//app.listen(port, () => console.log(`Escuchando servidor en el puerto ${port}!`))
//Server.on ('error', error => console.error(`Error en el servidor ${error}`))
const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))
 
//Server root
app.get("/", (req , res) => {
    res.send("<h1>Bienvenido al servidor ATRIA </h1>")
})
