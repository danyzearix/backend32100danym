//Render UI --- Products
let nombre = document.querySelector("#nombre"),
precio = document.querySelector("#precio"),
foto = document.querySelector("#foto"),
enviar = document.querySelector("#buttonSend"),
tabla = document.querySelector("#renderTabla");

//Render UI Chat
let chatForm = document.querySelector("#formChat"),
inputMail = document.querySelector("#inputMail"),
inputText = document.querySelector("#inputText"),
sendChat = document.querySelector("#chatSend"),
chatBox = document.querySelector("#chatBox")

//Render Function Products
function renderUI(productos,data) {
    const table = `
    <tr>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Imagen</th>
    </tr>`;
    const html = productos
      .map((product) => {
        let dinamicTable = ` 
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><img width="50" src=${product.img}/></td>
        </tr>
          `;
        return dinamicTable;
      })
      .join("");
    tabla.innerHTML = `${table} ${html}`;
 }

 //Render Function Chat
 function renderCHAT(messages) {

  const chatRender = messages.map((message) => {
      let dinamicChat = ` 
      <ul>
        <li> ${message.time} ${message.user}: ${message.info} </li>
      </ul>
        `;
      return dinamicChat;
    })
    .join("");
  chatBox.innerHTML = `${chatRender}`;
}