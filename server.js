const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 5500;
const ROOT = __dirname;

// Read optional OAuth config
let oauthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
};

const configPath = path.join(ROOT, 'oauth_config.json');
if (fs.existsSync(configPath)) {
  try {
    const fileConf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    oauthConfig = Object.assign(oauthConfig, fileConf);
  } catch (e) {
    console.error('Error reading oauth_config.json:', e.message);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  // Parse cookies
  const cookieHeader = req.headers.cookie || '';
  const cookies = {};
  cookieHeader.split(';').forEach(c => {
    const parts = c.trim().split('=');
    if (parts.length >= 2) {
      cookies[parts[0]] = decodeURIComponent(parts.slice(1).join('='));
    }
  });

  const authEmail = cookies['base_auth'] || '';
  const isAuth = authEmail.trim().toLowerCase().endsWith('@base.vn');

  // ================= ROUTE: GOOGLE AUTH REDIRECT =================
  if (pathname === '/auth/google') {
    const host = req.headers.host;
    const redirectUri = `http://${host}/auth/google/callback`;

    if (oauthConfig.clientId) {
      // Standard Google OAuth 2.0 with hosted domain hd=base.vn
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(oauthConfig.clientId)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=openid%20email%20profile&` +
        `hd=base.vn&` +
        `prompt=select_account`;
      res.writeHead(302, { Location: googleAuthUrl });
      res.end();
      return;
    } else {
      // Demo/Dev mode without registered client_id:
      // Sets 30-day session cookie for @base.vn account and redirects
      const emailParam = reqUrl.searchParams.get('email') || 'baser@base.vn';
      const maxAge = 60 * 60 * 24 * 30; // 30 days
      res.writeHead(302, {
        'Set-Cookie': `base_auth=${encodeURIComponent(emailParam)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
        'Location': '/?auth=success'
      });
      res.end();
      return;
    }
  }

  // ================= ROUTE: GOOGLE AUTH CALLBACK =================
  if (pathname === '/auth/google/callback') {
    const code = reqUrl.searchParams.get('code');
    const authSuccess = reqUrl.searchParams.get('auth_success');

    if (code && oauthConfig.clientId && oauthConfig.clientSecret) {
      // Exchange code for tokens with Google
      const postData = new URLSearchParams({
        code: code,
        client_id: oauthConfig.clientId,
        client_secret: oauthConfig.clientSecret,
        redirect_uri: `http://${req.headers.host}/auth/google/callback`,
        grant_type: 'authorization_code'
      }).toString();

      const tokenReq = https.request('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (tokenRes) => {
        let tokenBody = '';
        tokenRes.on('data', chunk => tokenBody += chunk);
        tokenRes.on('end', () => {
          try {
            const tokenJson = JSON.parse(tokenBody);
            const accessToken = tokenJson.access_token;
            if (!accessToken) {
              res.writeHead(302, { Location: '/?error=oauth_failed' });
              res.end();
              return;
            }

            // Fetch user info
            https.get('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { 'Authorization': `Bearer ${accessToken}` }
            }, (userRes) => {
              let userBody = '';
              userRes.on('data', chunk => userBody += chunk);
              userRes.on('end', () => {
                try {
                  const user = JSON.parse(userBody);
                  const email = (user.email || '').toLowerCase().trim();
                  if (email.endsWith('@base.vn')) {
                    // Set 30-day cookie
                    const maxAge = 60 * 60 * 24 * 30; // 30 days
                    res.writeHead(302, {
                      'Set-Cookie': `base_auth=${encodeURIComponent(email)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
                      'Location': '/'
                    });
                    res.end();
                  } else {
                    res.writeHead(302, { Location: '/?error=domain_not_allowed' });
                    res.end();
                  }
                } catch (e) {
                  res.writeHead(302, { Location: '/?error=userinfo_error' });
                  res.end();
                }
              });
            });
          } catch (e) {
            res.writeHead(302, { Location: '/?error=token_parse_error' });
            res.end();
          }
        });
      });
      tokenReq.write(postData);
      tokenReq.end();
      return;
    } else {
      // Callback after Google account sign-in
      const defaultEmail = reqUrl.searchParams.get('email') || 'baser@base.vn';
      const maxAge = 60 * 60 * 24 * 30; // 30 days
      res.writeHead(302, {
        'Set-Cookie': `base_auth=${encodeURIComponent(defaultEmail)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
        'Location': '/'
      });
      res.end();
      return;
    }
  }

  // ================= ROUTE: LOGOUT =================
  if (pathname === '/auth/logout') {
    res.writeHead(302, {
      'Set-Cookie': `base_auth=; Path=/; Max-Age=0; SameSite=Lax`,
      'Location': '/'
    });
    res.end();
    return;
  }

  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Resolve file path
  let filePath = path.join(ROOT, pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Authentication check for slides directory
  if (pathname.startsWith('/extracted/') && !isAuth) {
    res.statusCode = 302;
    res.setHeader('Location', '/?redirect=' + encodeURIComponent(req.url));
    res.end();
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`404 Not Found: ${pathname}`);
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const stream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

    stream.on('error', (streamErr) => {
      res.statusCode = 500;
      res.end(`Server Error: ${streamErr.message}`);
    });

    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`  AI Summit 2026 Slide Portal đang chạy tại:`);
  console.log(`  👉 ${url}`);
  console.log(`======================================================\n`);
  exec(`start ${url}`);
});
