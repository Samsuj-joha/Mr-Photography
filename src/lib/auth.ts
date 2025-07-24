// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 [AUTH] Login attempt started')
        console.log('📧 [AUTH] Email:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ [AUTH] Missing credentials')
          return null
        }

        try {
          // Normalize email
          const email = credentials.email.toLowerCase().trim()
          console.log('🔍 [AUTH] Looking for user:', email)

          const user = await prisma.user.findUnique({
            where: { email }
          })

          console.log('👤 [AUTH] User found:', !!user)
          if (user) {
            console.log('🔑 [AUTH] User role:', user.role)
            console.log('🔐 [AUTH] Has password:', !!user.password)
          }

          if (!user) {
            console.log('❌ [AUTH] User not found in database')
            return null
          }

          if (!user.password) {
            console.log('❌ [AUTH] User has no password set')
            return null
          }

          console.log('🔓 [AUTH] Verifying password...')
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          console.log('✅ [AUTH] Password valid:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('❌ [AUTH] Invalid password')
            return null
          }

          console.log('🎉 [AUTH] Authentication successful')
          console.log('📤 [AUTH] Returning user data:', {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('❌ [AUTH] Database error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('🎫 [JWT] Callback triggered')
      if (user) {
        console.log('👤 [JWT] Adding user to token:', user.role)
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log('📱 [SESSION] Callback triggered')
      if (token) {
        console.log('🎫 [SESSION] Adding token data to session')
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      console.log('📤 [SESSION] Final session:', {
        email: session.user?.email,
        role: session.user?.role
      })
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

declare module 'next-auth' {
  interface User {
    role: string
  }
  interface Session {
    user: User & {
      id: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    id: string
  }
}