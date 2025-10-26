import api from './api'
import { Expense, ExpenseFormData, ExpenseStats, ExpenseFilters, ApiResponse, PaginationInfo } from '../types'

interface ExpensesResponse {
  expenses: Expense[]
  pagination: PaginationInfo
}

export const expenseService = {
  async getExpenses(_token: string, filters?: ExpenseFilters): Promise<ExpensesResponse> {
    try {
      const params = new URLSearchParams()
      
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.limit) params.append('limit', filters.limit.toString())
      if (filters?.category) params.append('category', filters.category)
      if (filters?.startDate) params.append('startDate', filters.startDate)
      if (filters?.endDate) params.append('endDate', filters.endDate)
      if (filters?.search) params.append('search', filters.search)

      const response = await api.get<ApiResponse<ExpensesResponse>>(`/expenses?${params.toString()}`)
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch expenses')
      }
      
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch expenses')
    }
  },

  async createExpense(_token: string, data: ExpenseFormData): Promise<Expense> {
    try {
      const response = await api.post<ApiResponse<{ expense: Expense }>>('/expenses', data)
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to create expense')
      }
      
      return response.data.data.expense
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create expense')
    }
  },

  async updateExpense(_token: string, id: string, data: ExpenseFormData): Promise<Expense> {
    try {
      const response = await api.put<ApiResponse<{ expense: Expense }>>(`/expenses/${id}`, data)
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to update expense')
      }
      
      return response.data.data.expense
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update expense')
    }
  },

  async deleteExpense(_token: string, id: string): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/expenses/${id}`)
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete expense')
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete expense')
    }
  },

  async getStats(_token: string, startDate?: string, endDate?: string): Promise<ExpenseStats> {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)

      const response = await api.get<ApiResponse<ExpenseStats>>(`/expenses/stats?${params.toString()}`)
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch statistics')
      }
      
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics')
    }
  }
}
