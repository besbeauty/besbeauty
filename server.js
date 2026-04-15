require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/sheets', async (req, res) => {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const SHEET_ID = process.env.SHEET_ID;

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Dados!A1:E100',
    });

    const rows = response.data.values || [];
    const data = rows.slice(1).map((row) => ({
      id: Math.random(),
      nome: row[0],
      preco: parseFloat(row[1]),
      genero: row[2],
      destaque: row[3]?.toLowerCase() === 'sim',
      image: row[4],
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
