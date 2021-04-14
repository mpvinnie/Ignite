export default {
  jwt: {
    secret: process.env.JWT_SECRET as string || '32845ac9bc81fa0af33ea3db35f2497e',
    expiresIn: '1d'
  }
}
