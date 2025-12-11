// Netlify Function dla API
// To jest wrapper dla głównego serwera Express

const serverless = require('serverless-http');

// Ustaw zmienną środowiskową dla Netlify
process.env.NETLIFY = 'true';

// Importuj główną aplikację Express
const path = require('path');
const app = require(path.join(__dirname, '../../server/index.js'));

// Eksportuj jako funkcję Netlify
module.exports.handler = serverless(app);

