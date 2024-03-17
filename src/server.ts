const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
console.log(path.join(__dirname, 'build'));
// @ts-ignore
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const privateKey = fs.readFileSync('../client-key.pem');
const certificate = fs.readFileSync('../client-cert.pem');

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const port = 443;

httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

