//Instanciar conexion del cliente con el servidor
const socket = io(); // Socktes server connection - Instanciar el servidor de socket
//Obtener el html ID
const chat = document.getElementById("chat");

//Escuchando el evento proveniente del backend

socket.on("messages", (data)=>{
    console.log(data);
    //obtener los datos del array de mensaje y recorrerlo con el método .map
    const html = data.map((message) =>{
        //Dibuejar el html con templates strings
        return `
        <span>
            <strong> ${message.author} : </strong> ${message.text}
        </span> <br>
        `;
    }).join("\n"); //Separar el arreglo con el caracter que indiquemos en este caso con salto de linea
    chat.innerHTML = html
})