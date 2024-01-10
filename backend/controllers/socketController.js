const roomManagement = require('../utils/roomManagement');

function handleConnection(socket, io) {
  console.log("4",socket.id)
  socket.on('joinRoom', (data) => {
    console.log(data)
      
    const room = roomManagement.joinRoom(data);
    console.log("room7",room)   
    if(room.users.includes(data.user)){
      // console.log(room.id)
      socket.join(room.id)
      socket.emit('roomId', room.id)
      socket.emit('socketId',socket.id)
    }
    io.to(room.id).emit('roomStatus', room);
    console.log(room.users.includes(data.user))
    // Check if the room is full and contains the player to start the game
    if (room.users.length === 2 && room.users.includes(data.user)) {
        console.log("room",room)
       // Emit a signal to start the two-player game
      io.to(room.id).emit('startTwoPlayerGame',room);
    }
    socket.emit('socketId',socket.id)
    
    socket.on('socketId',(socketId) =>{
      console.log("27",socketId)
        io.to(socketId).emit('setTurn', true)
    })

    socket.on('changeTurn',(socketId, turn) =>{
      console.log("35",socketId, turn)
      if (turn == true){
        io.to(socketId).emit('setTurn', false)
      }
      else{
        io.to(socketId).emit('setTurn', true)
      }
       
    })
    socket.on('updateGameState', (gameState) => {
        // console.log('Received updated gameState:', gameState
    
        // Broadcast the received gameState to all connected players
        io.to(room.id).emit('broadcastGameState',{gameState:gameState});
    });

  });





  socket.on('disconnectUser', (data) => {
    // Logic to handle disconnection
    roomManagement.leaveRoom(data.user);
  });
}

module.exports = { handleConnection };