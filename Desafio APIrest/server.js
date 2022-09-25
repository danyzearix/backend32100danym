//DESAFIO MANEJO DE ARCHIVOS 
const fs = require ("fs")

//Clase constructora con parametro del archivo
class Contenedor {
constructor(archivo) {
    this.archivo = archivo;
        async  function crearArchivo() {
            try{
                await fs.promises.writeFile(`${archivo}`, "")
                console.log("Archivo creado")
            } catch (err) {
                console.log("Hubo un error : ${err}")
            }

        } 
        //Llamar función que crea el archivo
        crearArchivo( )
    }
    //MÉTODO SAVE
        async save (obj) {
            try {
                let inventario = await fs.promises.readFile(`${this.archivo}`, 'utf-8')
                console.log(inventario)
                
                if (!inventario) {                                                                                                              //Si inventario está vacio 
                    obj.id = 1
                    const arrayObjetos = [obj]
                    await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(arrayObjetos))
                    return obj.id
                } else {                                                                                                                            //Si hay un objeto
                    inventario= JSON.parse(inventario);
                    obj.id = inventario[inventario.length - 1].id + 1
                    inventario.push(obj)
                    await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(inventario))
                    return obj.id
                }
            } catch (err) {
                console.log(`no se pudeo agregar el producto por : ${err}`)
            }
    }   //Cierre de método save

            //METODO GETBYID
            //Va a recibir un id y devuelve el objeto con el id instanciado, si no existe un producto con ese id devuelve null
            async getbyId(id) {
                try {
                    const inventario = await fs.promises.readFile(`${this.archivo}`, "utf-8")
                    let datosParse = JSON.parse(inventario)
                    let objFinder = datosParse.find(item => item.id == id)
                    if (objFinder) {
                        return objFinder
                    } else {
                        return null
                    }

                } catch (err) {
                    console.log(`hubo un error en recuperar el objeto por id : ${err}`)
                }
            }   //Cierre del método getbyid

                    //MÉTODO GETALL
                    // devuelve un array de objetos con todos los productos de tipo objeto que esten el archivo 
                    async getAll() {
                        try {
                            const inventario = await fs.promises.readFile(`${this.fileName}`, "utf-8")
                            let inventarioParse = JSON.parse(inventario)
                            return inventarioParse
                        } catch (err) {
                            console.log(`hubo un error : ${err}`)
                        }
                    } //Cierre del metodo getAll

                        //MÉTODO DELETEBYID
                        // borra el elemento según el id que le pasemos en el archivo 
                        async deleteById(id) {
                            try {
                                const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
                                let dataParse = JSON.parse(data)
                                let objsFind = dataParse.filter((item) => item.id != id)
                                fs.promises.writeFile(`${this.archivo}`, JSON.stringify(objsFind))
                                console.log(`objeto con id : ${id} eliminado`)
                            } catch (err) {
                                console.log(`Hubo un error en recuperar el objeto por id : ${err}`)
                            }
                        }   //Cierre del método deletebyid

                                    //MÉTODO DELETEALL
                                    // Elimina todos los objetos - productos 
                                    async deleteAll() {
                                        try {
                                            await fs.promises.writeFile(`./${this.archivo}`, " ")
                                            console.log("Archivo eliminado")
                                        } catch (err) {
                                            console.log(`hubo un error en la operación de borrado: ${err}`)
                                        }
                                    }
} //Cierre de la clase constructora


//Crear objeto que tome archivo como parámetro constructor
const nuevoArchivo = new Contenedor ("./productos.txt")

// arrow function const name = ( ) => {Bloque a ejecutar}

async function cargarInformacion (){
    await nuevoArchivo.save({ title: "cartuchera", price: 100, thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/891/147/products/15222071-151595990d47d4f35b16467701309837-1024-1024.jpg" })
    await nuevoArchivo.save({ title: "lapiz", price: 300, thumbnail: "https://papeleria24h.files.wordpress.com/2019/03/punta-lapiz-staedtler-tradition-110.jpg?w=982" })
    await nuevoArchivo.save({ title: "carpeta", price: 500, thumbnail: "https://www.rioshopdeco.com.ar/6534-large_default/carpeta-pp-tonalizada-escolar-3x40-azul-art-5401.jpg" })
}

cargarInformacion()
