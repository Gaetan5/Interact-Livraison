import http from 'http';
import { statSync, createReadStream, existsSync } from 'fs';
import { extname, join, normalize } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = normalize(join(__filename, '..'));

const publicDir = join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8'
};

function safePath(p) {
  const resolved = normalize(join(publicDir, p));
  if (!resolved.startsWith(publicDir)) return publicDir; // prevent path traversal
  return resolved;
}

const server = http.createServer((req, res) => {
  let urlPath = (req.url || '/').split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = safePath(urlPath);
  const fileExists = existsSync(filePath);

  if (!fileExists) {
    const indexPath = join(publicDir, 'index.html');
    if (existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      createReadStream(indexPath).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  try {
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      const indexPath = join(filePath, 'index.html');
      if (existsSync(indexPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        createReadStream(indexPath).pipe(res);
        return;
      }
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
