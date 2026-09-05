import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = '127.0.0.1';
const DATA_FILE = path.join(__dirname, 'data.json');
const LEARNING_FILE = path.join(__dirname, 'learning.json');
const INDEX_FILE = path.join(__dirname, 'index.html');
const TEST_FILE = path.join(__dirname, 'test.html');
const TEST_DEF_FILE = path.join(__dirname, 'test-definizioni.html');
const TEST_TEO_FILE = path.join(__dirname, 'test-teoremi.html');
const ML_FILE = path.join(__dirname, 'machine-learning.html');
const TERMINI_FILE = path.join(__dirname, 'termini.html');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = req.url.split('?')[0];

  const serveHtml = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Errore lettura file HTML');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  };

  // SERVE HTML PAGES
  if (req.method === 'GET') {
    if (reqUrl === '/' || reqUrl === '/index.html') {
      serveHtml(INDEX_FILE);
      return;
    }
    if (reqUrl === '/test' || reqUrl === '/test.html') {
      serveHtml(TEST_FILE);
      return;
    }
    if (reqUrl === '/test-definizioni' || reqUrl === '/test/definizioni' || reqUrl === '/test-definizioni.html') {
      serveHtml(TEST_DEF_FILE);
      return;
    }
    if (reqUrl === '/test-teoremi' || reqUrl === '/test/teoremi' || reqUrl === '/test-teoremi.html') {
      serveHtml(TEST_TEO_FILE);
      return;
    }
    if (reqUrl === '/machine-learning' || reqUrl === '/archivio' || reqUrl === '/ml' || reqUrl === '/machine-learning.html') {
      serveHtml(ML_FILE);
      return;
    }
    if (reqUrl === '/termini' || reqUrl === '/termini-di-utilizzo' || reqUrl === '/termini.html') {
      serveHtml(TERMINI_FILE);
      return;
    }
  }

  // READ DATA.JSON
  if (req.method === 'GET' && (req.url === '/api/data' || req.url === '/data.json')) {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data && data.trim() ? data : '[]');
    });
    return;
  }

  // SAVE DIRECTLY TO DATA.JSON ON DISK (NO BROWSER DOWNLOAD POPUP NEEDED!)
  if (req.method === 'POST' && req.url === '/api/save') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf8');
        console.log(`[SERVIZIO] Salvati ${parsed.length} elementi direttamente in data.json`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: parsed.length }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // READ LEARNING DATA
  if (req.method === 'GET' && req.url === '/api/learning') {
    fs.readFile(LEARNING_FILE, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data && data.trim() ? data : '{}');
    });
    return;
  }

  // SAVE LEARNING DATA
  if (req.method === 'POST' && req.url === '/api/learning') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(LEARNING_FILE, JSON.stringify(parsed, null, 2), 'utf8');
        console.log(`[ML] Aggiornati dati di apprendimento (${Object.keys(parsed).length} elementi)`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Non trovato');
});

server.listen(PORT, HOST, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Servizio Geometria attivo su: http://${HOST}:${PORT}`);
  console.log(`==================================================\n`);
});
