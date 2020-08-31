// server.js
// where your node app starts

const express = require("express");
const socket = require("socket.io");

const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("client"));



// listen for requests :)
const server = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + server.address().port);
});



let mySocket = socket(server);

mySocket.sockets.on('connection', handleConnection);


function handleConnection(connection){
  console.log(connection.id);
  connection.on('mouse', handleMouseMovement);
  
  function handleMouseMovement(data){
    connection.broadcast.emit('mouse', data);
    console.log(data);
  }

}