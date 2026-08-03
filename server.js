const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const INDEX_FILE = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // SERVE INDEX.HTML
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(INDEX_FILE, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Errore lettura index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // READ DATA.JSON
  if (req.method === 'GET' && (req.url === '/api/data' || req.url === '/data.json')) {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data && data.trim() ? data : '[]');
    });
    return;
  }

  // SAVE DIRECTLY TO DATA.JSON ON DISK (NO BROWSER DOWNLOAD NEEDED!)
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

  res.writeHead(404);
  res.end('Non trovato');
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Servizio Geometria attivo su: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
