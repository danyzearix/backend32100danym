//Required modules
const { Router } = require("express")
const { request } = require("http")
const Module = require("module")
const { addAbortSignal } = require("stream")
const { text } = require("stream/consumers")
const router = Router()
let productos = require("../data/productos")

const msgError = {"error": "producto no encontrado"}
//Api routes
//Home
router.get("/home", (req, res ) => {
    res.send("<h1>Bienvenido estas en el home de la api de productos</h1>")
})
//Productos GET All
router.get("/productos", (req, res ) => {
    res.json(productos)
})

//Productos GET by ID
router.get("/productos/:id", (req , res) => {
    let id = Number( req.params.id )
   
    let producto = productos.find (producto => producto.id === id)
        console.log(producto)
            if (producto) {
            res.json(producto)
            }else{
            res.json(msgError).end()
            }
})
//Productos POST
router.post('/productos', (req, res) =>{
    let { title, price, thumbnail } = req.body
    const id= productos.length+1 
    const nuevoProducto = {...req.body, id}
    productos.push(nuevoProducto);
    res.json(productos)
})

//Productos PUT by ID
router.put('/productos/:id',(req, res) => {
    const id = req.params.id
    const body = req.body
    productos.filter(producto => {
        if (producto.id == id) {
            producto.title = body.title
            producto.price = body.price
            producto.thumbnail = body.thumbnail

        }
    })
    return res.json(productos)
})

//Productos DELETE by ID
router.delete ("/productos/:id", (req , res) => {
    let id = Number( req.params.id )
    productos = productos.filter (producto => producto.id != id)
    res.status(204).end()
})
module.exports = router

