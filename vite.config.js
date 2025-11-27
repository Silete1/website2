import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const adminHtml = readFileSync(resolve(__dirname, 'admin/index.html'), 'utf-8');

const serveAdmin = (server) => {
  server.middlewares.use((req, res, next) => {
    if (req.url === '/admin' || req.url === '/admin/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(adminHtml);
      return;
    }
    next();
  });
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'serve-admin-entry',
      configureServer(server) {
        serveAdmin(server);
      },
      configurePreviewServer(server) {
        serveAdmin(server);
      },
    },
    react(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
});
