import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = io('http://localhost:3000'); 
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    // Listen server
    this.socket.on('messageToClient', (data) => {
      const payload = JSON.stringify(data.payload)
      console.log(`Received serverEvent: ${payload}`);
      console.log(data.payload.message)
    });
  }

  // Emit to Server
  emitClientEvent(data) {
    this.socket.emit('messageToServer', { payload: data });
  }
  
}

export default SocketService;
