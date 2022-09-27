const express = require('express')
const { Server : HttpServer } = require("http");
const { Server : SocketServer } = require("socket.io");

const port = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const messages = [];
const users = [];



//Middlewares
app.use(express.static("./public"));

//Routes
app.get ("/chat", (re))
//Listen
httpServer.listen(port, () => console.log(`Server in up and running ins ${port}!`))

//Sockets Events
io.on('connection', (socket) =>{
    console.log("New client conection");
    const newUser = {}
    socket.emit("messages", [...messages])

    //Join chat event
    socket.on("join-chat", (data)=>{
        const newUser ={
            id: socket.id,
            username: data.username
        };
        users.push(newUser);
        //Bot greeting
    })
})
