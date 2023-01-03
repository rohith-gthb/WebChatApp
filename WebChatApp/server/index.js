const express = require('express');
const http = require('http')
const cors = require('cors')

const app = express();
app.use(cors());

const server = http.createServer(app);

const {Server} = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    console.log(`user conn: ${socket.id}`)

    socket.on("join_room", (data)=>{
        /*
            Authenticate
            
            Authorize 

            data = {username, roomID}
            create a DATABASE and update the data
            store the room-ids the user has joined
        */
        const { username, roomID } = data;
        socket.join(roomID);
        console.log(`User with name ${username} has joined room ${roomID}`)
    })

    socket.on('send_messege', (data)=>{
        socket.to(data.roomID).emit('receive_messege',data);
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected")
    })
})

server.listen(3001,()=>{
    console.log("server running @ 3001");
});