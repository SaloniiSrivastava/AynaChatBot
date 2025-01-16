import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

export const initializeWebSocketServer = (httpServer: Server): void => {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message: string) => {
      console.log('Received message:', message);

      // Echo the message back to the client
      ws.send(message);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};
