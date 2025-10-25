import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { ExpenseContextType, Expense, ExpenseStats, ExpenseFilters, ExpenseFormData } from '../types'
import { expenseService } from '../services/expenseService'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined)

interface ExpenseProviderProps {
  children: ReactNode
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [stats, setStats] = useState<ExpenseStats | null>(null)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  const fetchExpenses = useCallback(async (params?: ExpenseFilters) => {
    if (!token) return
    
    try {
      setLoading(true)
      const response = await expenseService.getExpenses(token, params)
      setExpenses(response.expenses)
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch expenses')
    } finally {
      setLoading(false)
    }
  }, [token])

  const fetchStats = useCallback(async (startDate?: string, endDate?: string) => {
    if (!token) return
    
    try {
      const response = await expenseService.getStats(token, startDate, endDate)
      setStats(response)
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch statistics')
    }
  }, [token])

  const createExpense = useCallback(async (data: ExpenseFormData) => {
    if (!token) return
    
    try {
      setLoading(true)
      const newExpense = await expenseService.createExpense(token, data)
      setExpenses(prev => [newExpense, ...prev])
      toast.success('Expense created successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create expense')
      throw error
    } finally {
      setLoading(false)
    }
  }, [token])

  const updateExpense = useCallback(async (id: string, data: ExpenseFormData) => {
    if (!token) return
    
    try {
      setLoading(true)
      const updatedExpense = await expenseService.updateExpense(token, id, data)
      setExpenses(prev => prev.map(expense => 
        expense._id === id ? updatedExpense : expense
      ))
      toast.success('Expense updated successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update expense')
      throw error
    } finally {
      setLoading(false)
    }
  }, [token])

  const deleteExpense = useCallback(async (id: string) => {
    if (!token) return
    
    try {
      setLoading(true)
      await expenseService.deleteExpense(token, id)
      setExpenses(prev => prev.filter(expense => expense._id !== id))
      toast.success('Expense deleted successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete expense')
      throw error
    } finally {
      setLoading(false)
    }
  }, [token])

  // Fetch initial data when token is available
  useEffect(() => {
    if (token) {
      fetchExpenses()
      fetchStats()
    }
  }, [token, fetchExpenses, fetchStats])

  const value: ExpenseContextType = {
    expenses,
    stats,
    loading,
    fetchExpenses,
    fetchStats,
    createExpense,
    updateExpense,
    deleteExpense
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}

export const useExpenses = () => {
  const context = useContext(ExpenseContext)
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider')
  }
  return context
}
