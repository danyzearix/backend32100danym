class Products {
    constructor (id, timestamp, nombre, descripcion, codigo, foto, precio, stock) {
        this.id = id,
        this.timestamp = timestamp,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.foto = foto,
        this.precio = precio,
        this.stock = stock
    };
//Metodos de la clase
//--Get by ID
getById(id){
    let producto = productos.find (producto => producto.id === id);
    console.log(producto);
}
};

module.exports = Products;