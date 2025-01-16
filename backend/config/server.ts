import { Server } from 'http';
import { initializeWebSocketServer } from '../src/websocket';

export default ({ env }: { env: any }) => {
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    afterServerStarted: async ({ server }: { server: Server }): Promise<void> => {
      console.log('Strapi server started, initializing WebSocket...');
      initializeWebSocketServer(server);
    },
  };
};
