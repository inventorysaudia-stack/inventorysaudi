import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { authRepository } from '../repositories/auth.repository'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentSession().then(session => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: listener } = authRepository.onAuthStateChange(session => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: () => navigate('/'),
    onError: (error: Error) => console.error('Login failed:', error.message),
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => navigate('/login'),
  })

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  }
}