const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html');
})

/* io.use(async (socket, next) => {
  try {
    const user = await fetchUser(socket);
      socket.user = user;
      console.log('socket user', socket)
  } catch (e) {
    next(new Error("unknown user"));
  }
}); */

io.on('connection', (socket) => {
    console.log('user connected');
    //console.log(socket.id); // ojIckSD2jqNzOqIrAGz
      console.log(socket.user);

    /* socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  }); */
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
    socket.on('chat message', (msg) => {
        console.log('msg:', msg);
        //socket.broadcast.emit('hi')
        io.emit('chat message', msg);
    })
    
})
server.listen(3000, () => {
    console.log("app running on http://localhost:3000")
})