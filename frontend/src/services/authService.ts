import api from './api'
import { User, ApiResponse } from '../types'

interface LoginResponse {
  user: User
  token: string
}

interface RegisterResponse {
  user: User
  token: string
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
        email,
        password
      })
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Login failed')
      }
      
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    try {
      const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', {
        name,
        email,
        password
      })
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Registration failed')
      }
      
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  async getProfile(token: string): Promise<User> {
    try {
      const response = await api.get<ApiResponse<{ user: User }>>('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to get profile')
      }
      
      return response.data.data.user
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profile')
    }
  }
}


