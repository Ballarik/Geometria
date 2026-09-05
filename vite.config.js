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
        name: 'html-env-transform',
        transformIndexHtml(html) {
          const supabaseUrl = env.VITE_SUPABASE_URL || 'https://ybpvdijjxrtarhkkqptt.supabase.co';
          const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_MCO5-bhukiy1pjoUotfKDg_mbfUxItY';
          const script = `<script>window.VITE_SUPABASE_URL = ${JSON.stringify(supabaseUrl)}; window.VITE_SUPABASE_ANON_KEY = ${JSON.stringify(supabaseKey)};</script>`;
          return html.replace('<head>', `<head>\n  ${script}`);
        }
      },
      {
        name: 'route-rewrite-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url.split('?')[0];
            if (url === '/test') {
              req.url = '/test.html';
            } else if (url === '/test-definizioni' || url === '/test/definizioni') {
              req.url = '/test-definizioni.html';
            } else if (url === '/test-teoremi' || url === '/test/teoremi') {
              req.url = '/test-teoremi.html';
            } else if (url === '/machine-learning' || url === '/archivio' || url === '/ml') {
              req.url = '/machine-learning.html';
            } else if (url === '/termini' || url === '/termini-di-utilizzo') {
              req.url = '/termini.html';
            } else if (url === '/404') {
              req.url = '/404.html';
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url.split('?')[0];
            if (url === '/test') {
              req.url = '/test.html';
            } else if (url === '/test-definizioni' || url === '/test/definizioni') {
              req.url = '/test-definizioni.html';
            } else if (url === '/test-teoremi' || url === '/test/teoremi') {
              req.url = '/test-teoremi.html';
            } else if (url === '/machine-learning' || url === '/archivio' || url === '/ml') {
              req.url = '/machine-learning.html';
            } else if (url === '/termini' || url === '/termini-di-utilizzo') {
              req.url = '/termini.html';
            } else if (url === '/404') {
              req.url = '/404.html';
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
          test: resolve(__dirname, 'test.html'),
          testDefinizioni: resolve(__dirname, 'test-definizioni.html'),
          testTeoremi: resolve(__dirname, 'test-teoremi.html'),
          machineLearning: resolve(__dirname, 'machine-learning.html'),
          termini: resolve(__dirname, 'termini.html'),
          notfound: resolve(__dirname, '404.html'),
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  };
});
