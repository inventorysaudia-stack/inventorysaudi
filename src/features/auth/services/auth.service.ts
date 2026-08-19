import { authRepository } from '../repositories/auth.repository'

export const authService = {
  async login(email: string, password: string) {
    if (!email || !email.includes('@')) {
      throw new Error('البريد الإلكتروني غير صحيح')
    }
    if (!password || password.length < 6) {
      throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    }
    return authRepository.signIn(email, password)
  },

  async logout() {
    return authRepository.signOut()
  },

  async getCurrentSession() {
    return authRepository.getSession()
  },
}