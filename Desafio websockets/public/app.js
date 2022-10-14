const socket = io.connect();

socket.on("historial", (data) =>{
  renderUI(data);
})

// socket.on("recoverChat", (data) =>{
//   renderCHAT(data);
// })
//----Codigo que deberia recuperar los mensajes
// socket.on ("allmsg", (messages) =>{

//   messages.map((message) => {
//     chatBox.innerHTML = ` 
//     <ul>
//       <li> ${message.time} ${message.user}: ${message.info} </li>
//     </ul>
//       `;
// })});

  enviar.addEventListener('click', (e) => {
    (e).preventDefault();

    let info = {
        name: nombre.value,
        price: precio.value,
        img: foto.value,
    };
    socket.emit("productosLive", (info));

    socket.on("render", (productos) => {
       renderUI(productos);
    });
});

sendChat.addEventListener("click", (e) =>{
  (e).preventDefault();
  let message = {
    user: inputMail.value,
    info: inputText.value,
    time: moment().format('h:mm a')
  }
 socket.emit("chatMessages", (message));

 socket.on("renderChat", function (messages) {
     console.log(messages);
     renderCHAT(messages);
   });
});
