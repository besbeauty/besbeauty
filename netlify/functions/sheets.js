import jwt from 'jsonwebtoken';

const CLOUD_NAME = 'dsxdphuim';
const DEFAULT_IMAGE_PUBLIC_ID = 'logo_vhfbsi';

function buildImageUrl(publicId) {
  const imageId = publicId?.trim() || DEFAULT_IMAGE_PUBLIC_ID;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_300/f_auto/q_auto/${imageId}`;
}

export const handler = async (event, context) => {
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

    // Busca dados da planilha (todas linhas)
    const sheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Dados!A:J`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } },
    );

    const sheetData = await sheetResponse.json();
    const rows = sheetData.values || [];
    const data = rows.slice(1).map((row) => {
      const rawImageId = row[9]?.trim() || '';

      if (!rawImageId) {
        console.log('[image-fallback]', {
          codigo: row[3]?.trim() || '',
          nome: row[4]?.trim() || '',
          fallback: DEFAULT_IMAGE_PUBLIC_ID,
        });
      }

      return {
        id: Math.random(),
        tipo: row[0]?.trim() || '',
        categoria: row[1]?.trim() || '',
        genero: row[2]?.trim() || '',
        codigo: row[3]?.trim() || '',
        nome: row[4]?.trim() || '',
        ml: row[5]?.trim() || '',
        preco:
          parseFloat(row[6]?.toString().replace('R$', '').replace(',', '.')) ||
          0,
        quantidade: parseInt(row[7]) || 0,
        destaque: row[8]?.trim().toLowerCase() === 'sim',
        image: buildImageUrl(rawImageId),
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
