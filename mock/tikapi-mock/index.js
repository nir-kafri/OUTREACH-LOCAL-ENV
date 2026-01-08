// mock/tikapi-mock/index.js
// HTTPS-capable TikApi mock. If you place cert.pem and key.pem in ./certs/ it will start HTTPS on port 443.
// Otherwise it will start a plain HTTP mock on port 5000.

const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');

const app = express();
app.use(express.json());

// Minimal mock endpoints — extend as needed
app.get('/user/info', (req, res) => {
  const username = req.query.username || 'unknown';
  res.json({
    status: 200,
    data: {
      user: {
        uniqueid: username,
        nickname: username,
        stats: { followerCount: 123, followingCount: 10, heart: 456 },
        signature: "mock signature",
      }
    }
  });
});

app.get('/video/info', (req, res) => {
  const id = req.query.id || '1';
  res.json({ status: 200, data: { video: { id: id, playcount: 1000, commentCount: 10, title: "mock video" } }});
});

// Add other endpoints used by your code here...

const CERT_DIR = path.join(__dirname, 'certs');
const certPath = path.join(CERT_DIR, 'api.tikapi.io.pem'); // certificate file created by mkcert
const keyPath = path.join(CERT_DIR, 'api.tikapi.io-key.pem'); // private key file created by mkcert

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  // Start HTTPS on port 443 (requires sudo on Unix to bind low port)
  const options = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };
  https.createServer(options, app).listen(443, () => {
    console.log('TikApi mock (HTTPS) listening on https://api.tikapi.io:443');
  });
} else {
  // Fallback: HTTP on port 5000
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`TikApi mock (HTTP) listening on http://localhost:${PORT}`);
    console.log('To use HTTPS (and route api.tikapi.io to this machine), create certs with mkcert and place files in ./certs/');
  });
}