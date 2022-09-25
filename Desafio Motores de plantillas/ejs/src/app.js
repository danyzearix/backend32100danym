const express = require('express')
const Productos = require('../api/productos.js')
const productos = new Productos()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.set('views', './views');
app.set('view engine', 'ejs');


app.post('/productos', (req, res) => {
    const producto = req.body
    productos.save(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = productos.getAll()

    res.render("main", {
        productos: prods,
        hayProductos: prods.length
    });
});



