import { google } from 'googleapis';

export const handler = async (event, context) => {
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
      range: 'Sheet1!A1:E100',
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

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
