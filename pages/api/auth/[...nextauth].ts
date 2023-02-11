import NextAuth, { NextAuthOptions } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

export const options: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      version: '2.0',
    }),
  ],
  callbacks: {
    jwt: async ({ token, profile }) => {
      if (profile) {
        token.userId = profile.id
      }
      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub
      return Promise.resolve(session)
    },
  },
}

export default NextAuth(options)
