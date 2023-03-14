import { OAuth2Client, LoginTicket } from 'google-auth-library'

const clientId = process.env.GOOGLE_CLIENT_ID

if (!clientId) throw new Error('No google client id')

const client = new OAuth2Client(
  '195330300131-d6e3jf3j87pbr9a476oehlutu1osrpln.apps.googleusercontent.com'
)

export const googleAuth = async (
  clientToken: string
): Promise<null | LoginTicket> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: clientToken,
      audience:
        '195330300131-d6e3jf3j87pbr9a476oehlutu1osrpln.apps.googleusercontent.com',
    })

    return ticket
  } catch (e) {
    return null
  }
}
