const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io'); // import the socket.io library
const cors = require('cors'); // import cors library to prevent issues and bugs

app.use(cors()) // use the cors 

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // which url is calling to specify the method -> react url
        methods: [ "GET", 'POST'],

    }
})

io.on('connection', (socket)=>{
    console.log( `User connected: ${socket.id}` );

    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joinded room: ${data}`);
    } )

    socket.on('disconnect', ()=>{
        console.log('User disconnected:',socket.id);
        
    })
})


//server port with arrow funtion
server.listen(3001, () => {
    console.log('Server running successfully');
})