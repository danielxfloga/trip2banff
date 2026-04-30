const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const PORT = Number(process.env.PORT || 3000);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    ...headers
  });
  res.end(body);
}

function safeJoin(base, requestPath) {
  const pathname = decodeURIComponent(requestPath.split('?')[0]);
  const normalized = path.normalize(pathname).replace(/^([.][.][/\\])+/, '').replace(/^[/\\]+/, '');
  const fullPath = path.join(base, normalized === '' || normalized === '.' ? 'index.html' : normalized);
  return fullPath.startsWith(base) ? fullPath : null;
}

function serveStatic(req, res) {
  const parsed = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const filePath = safeJoin(PUBLIC_DIR, parsed.pathname);
  if (!filePath) return send(res, 403, 'Forbidden');

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return send(res, 404, 'Not found');
    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=3600'
    };

    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed');
  }
  return serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Canada 2026 itinerary running at http://localhost:${PORT}`);
});
