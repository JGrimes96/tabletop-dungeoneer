var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
  console.log('Attempting Socket Test');
  Client.socket.emit('socket test');
};
