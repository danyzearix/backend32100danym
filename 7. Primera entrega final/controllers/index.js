//Required modules
const { Router } = require("express");
const router = Router();
const  fs  = require ("fs");
const Products = require("../models/datafunctions");
const Carrito = require("../models/cart.functions");
let productos = require("../models/productos");
let carritos = require("../models/carrito");

let carritoProducts = [];


//--Home
router.get("/home", (req, res ) => {
    res.send("<h1>Bienvenido estas en el home de la api de productos</h1>");
});

function writeProducts(params) {
    fs.writeFileSync("./productos.txt", params)
}
//Variable de administrador
const admin = true;

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

//------------CARRITO--------------//

//Carrito POST
router.post('/carrito', (req, res) =>{
    let ruta = req.path,
    metodo = req.method;

    if (admin == false) {
        res.json({error: -1, descripción: `Ruta ${ruta} método ${metodo} no autorizada`})
    } else {
        const id = carritos.length+1;
        let timestamp = Date.now() 
        const nuevoCarrito = new Carrito(id, timestamp);
            
            carritos.push(nuevoCarrito);
            let carritoId = nuevoCarrito.id
            console.log(carritos)
        
        res.send(`<h1>Carrito creado con el ID : ${carritoId}</h1>`);
    }
});

//Carrito DELETE by ID
router.delete ("/carrito/:id", (req , res) => {
    let ruta = req.path,
    metodo = req.method;

    if (admin == false) {
        res.json({error: -1, descripción: `Ruta ${ruta} método ${metodo} no autorizada`});
    } else {
        let id = Number( req.params.id );
        carritos = carritos.filter (carrito => carrito.id != id);
        res.status(204).end();
    }
});

//Carrito GET ID 
router.get("/carrito/:id/productos", (req , res) => {
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

//Carrito POST by productos
router.post('/carrito/:id/productos', (req, res) =>{
    let ruta = req.path,
    metodo = req.method;

    if (admin == false) {
        res.json({error: -1, descripción: `Ruta ${ruta} método ${metodo} no autorizada`})
    } else {
        let id = Number( req.params.id );
        
        let activeCar = carritos.find (carrito => carrito.id === id);
       
        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const idP = carritoProducts.length+1;
        let timestamp = Date.now() 
        const nuevoProducto = new Products(idP, timestamp, nombre, descripcion, codigo, foto, precio, stock);
        carritoProducts.push(nuevoProducto);

        let carritoUpdate = [carritos, ...carritoProducts];
        
        res.send(carritos);
    }
});

module.exports = router;

