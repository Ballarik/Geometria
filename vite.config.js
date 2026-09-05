import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'window.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'window.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
    },
    plugins: [
      react(),
      {
        name: 'route-rewrite-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/termini' || req.url === '/termini-di-utilizzo') {
              req.url = '/termini.html';
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/termini' || req.url === '/termini-di-utilizzo') {
              req.url = '/termini.html';
            }
            next();
          });
        }
      }
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          termini: resolve(__dirname, 'termini.html'),
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  };
});
