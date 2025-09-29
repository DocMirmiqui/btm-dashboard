import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert les fichiers statiques (index.html, assets, etc.)
app.use(express.static(__dirname));

// Proxy léger pour osu! (client credentials côté serveur)
app.post('/api/osu/token', async (req, res) => {
  try {
    const { clientId, clientSecret } = req.query;
    if (!clientId || !clientSecret) return res.status(400).json({ error: 'missing creds' });
    const body = new URLSearchParams();
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);
    body.set('grant_type', 'client_credentials');
    body.set('scope', 'public');
    const r = await fetch('https://osu.ppy.sh/oauth/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
    const text = await r.text();
    const isJson = (r.headers.get('content-type')||'').includes('application/json');
    const data = isJson ? JSON.parse(text) : { raw: text };
    if (!r.ok) {
      console.error('[osu token] status=', r.status, 'body=', data);
      return res.status(r.status).json({ error: 'osu_token_failed', status: r.status, details: data });
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'proxy_error' });
  }
});

app.get('/api/osu/*', async (req, res) => {
  try {
    const token = req.header('x-osu-token');
    if (!token) return res.status(401).json({ error: 'missing token' });
    const apiPath = req.params[0] || '';
    const url = 'https://osu.ppy.sh/api/v2/' + apiPath + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '');
    const r = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
    const contentType = r.headers.get('content-type') || '';
    res.status(r.status);
    if (contentType.includes('application/json')) {
      const data = await r.json();
      res.json(data);
    } else {
      const buf = await r.arrayBuffer();
      res.set('content-type', contentType);
      res.send(Buffer.from(buf));
    }
  } catch (e) {
    res.status(500).json({ error: 'proxy_error' });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});


