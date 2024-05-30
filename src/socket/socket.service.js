import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    // Escucha el evento 'messageToClient' del servidor
    this.socket.on('messageToClient', (data) => {
      const payload = JSON.stringify(data.payload)
      console.log(`Received serverEvent: ${payload}`);
      console.log(data.payload.message)
    });
  }

  // Emite el evento 'messageToServer' al servidor
  emitClientEvent(payload) {
    this.socket.emit('messageToServer', { payload });
  }
}

export default SocketService;
