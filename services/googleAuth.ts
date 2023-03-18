import axios from 'axios'
import oauth2Client, { OAuth2Client, LoginTicket } from 'google-auth-library'

const clientId = process.env.GOOGLE_CLIENT_ID

if (!clientId) throw new Error('No google client id')

const client = new OAuth2Client(
  '195330300131-d6e3jf3j87pbr9a476oehlutu1osrpln.apps.googleusercontent.com'
)

interface GoogleResponse {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: true
  locale: string
}

export const googleAuth = async (
  clientToken: string
): Promise<null | GoogleResponse> => {
  try {
    const userInfo: GoogleResponse = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${clientToken}` },
      })
      .then((res) => res.data)

    return userInfo
  } catch (e) {
    console.log(e)
    return null
  }
}
