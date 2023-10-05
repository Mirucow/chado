const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.use(express.static(__dirname + '/public'));

const messages = [];

io.on('connection', function(socket){
  socket.on('message', function([user, msg]){
    messages.push([user, msg]);
    if (messages.length > 20) {
      messages.shift();
    }
    io.emit('message', [user, msg]);
  });
  socket.on("oldMessages", function(){
    socket.emit("oldMessages", messages);
  });

  socket.on("join", function(user){
    io.emit("join", user);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});