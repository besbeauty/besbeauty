require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());

const CLOUD_NAME = 'dvnr5vroo';

function buildImageUrl(publicId) {
  if (!publicId) {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23e5e7eb" width="300" height="300"/%3E%3C/svg%3E';
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_300/f_auto/q_auto/${publicId}`;
}

app.get('/api/sheets', async (req, res) => {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const SHEET_ID = process.env.SHEET_ID;

    // Gera JWT token
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const token = jwt.sign(payload, credentials.private_key, {
      algorithm: 'RS256',
    });

    // Troca JWT por access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
    });

    const tokenData = await tokenResponse.json();

    // Busca dados da planilha
    const sheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Dados!A1:J100`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } },
    );

    const sheetData = await sheetResponse.json();
    const rows = sheetData.values || [];
    const data = rows.slice(1).map((row) => ({
      id: Math.random(),
      tipo: row[0]?.trim() || '',
      categoria: row[1]?.trim() || '',
      genero: row[2]?.trim() || '',
      codigo: row[3]?.trim() || '',
      nome: row[4]?.trim() || '',
      ml: row[5]?.trim() || '',
      preco: parseFloat(row[6]?.toString().replace('R$', '').replace(',', '.')) || 0,
      quantidade: parseInt(row[7]) || 0,
      destaque: row[8]?.trim().toLowerCase() === 'sim',
      image: buildImageUrl(row[9]?.trim()),
    }));

    res.json(data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
