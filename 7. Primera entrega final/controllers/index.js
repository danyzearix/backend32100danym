//Required modules
const { Router } = require("express");
const router = Router();
const  fs  = require ("fs");
const Products = require("../models/datafunctions");
let productos = require("../models/productos");

//--Home
router.get("/home", (req, res ) => {
    res.send("<h1>Bienvenido estas en el home de la api de productos</h1>");
});

function writeProducts(params) {
    fs.writeFileSync("./productos.txt", params)
}
//Variable de administrador
const admin = false;

//----API ROUTES
//Productos GET ALL
router.get("/productos", (req, res ) => {
    if (productos.length == 0) {
        res.send("<h1>Hola </h1>").end();
    } else{ let parseData =  JSON.stringify(productos)
        writeProducts(parseData);
       res.json(productos);}
});

//Productos GET by ID
router.get("/productos/:id?", (req , res) => {
    const msgError = {"error": "producto no encontrado"};
    let id = Number( req.params.id ); 
    
    let producto = productos.find (producto => producto.id === id);
        console.log(producto);
            if (producto) {
            res.json(producto);
            }else{
            res.json(msgError).end();
            }
});

//Productos POST
router.post('/productos', (req, res) =>{
    let ruta = req.path,
    metodo = req.method;

    if (admin == false) {
        res.json({error: -1, descripción: `Ruta ${ruta} método ${metodo} no autorizada`})
    } else {
        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const id = productos.length+1;
        let timestamp = Date.now() 
        const nuevoProducto = new Products(id, timestamp, nombre, descripcion, codigo, foto, precio, stock);

        productos.push(nuevoProducto);
        console.log(productos)
        
        res.send(productos);
    }
});

//Productos PUT by ID
router.put('/productos/:id',(req, res) => {
    let ruta = req.path,
    metodo = req.method;
    if (admin == false) {
        res.json({error: -1, descripción: `Ruta ${ruta} método ${metodo} no autorizada`})
    } else {
    const id = req.params.id;
    const body = req.body;
    productos.filter(producto => {
        if (producto.id == id) {
            producto.nombre = body.nombre;
            producto.descripcion = body.descripcion;
            producto.codigo = body.codigo;
            producto.foto = body.foto;
            producto.precio = body.precio;
            producto.stock = body.stock;
        }
    });
    return res.json(productos);
    }
});

//Productos DELETE by ID
router.delete ("/productos/:id", (req , res) => {
    let ruta = req.path,
    metodo = req.method;

    if (admin == false) {
        res.json({error: -1, descripción: `Ruta ${ruta} método ${metodo} no autorizada`});
    } else {
        let id = Number( req.params.id );
        productos = productos.filter (producto => producto.id != id);
        res.status(204).end();
    }
});

module.exports = router;

