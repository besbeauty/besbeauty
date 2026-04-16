import jwt from 'jsonwebtoken'

export const handler = async (event, context) => {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS)
    const SHEET_ID = process.env.SHEET_ID

    // Gera JWT token
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    }

    const token = jwt.sign(payload, credentials.private_key, { algorithm: 'RS256' })

    // Troca JWT por access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token
      })
    })

    const tokenData = await tokenResponse.json()

    // Busca dados da planilha
    const sheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Dados!A1:E100`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    )

    const sheetData = await sheetResponse.json()
    const rows = sheetData.values || []
    const data = rows.slice(1).map((row) => ({
      id: Math.random(),
      nome: row[0],
      preco: parseFloat(row[1]),
      genero: row[2],
      destaque: row[3]?.toLowerCase() === 'sim',
      image: row[4]
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('Erro:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
