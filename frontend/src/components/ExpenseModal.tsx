import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useExpenses } from '../contexts/ExpenseContext'
import { X, Calendar, DollarSign, Tag, FileText } from 'lucide-react'
import { ExpenseFormData, EXPENSE_CATEGORIES } from '../types'
import { format } from 'date-fns'

interface ExpenseModalProps {
  expense?: any
  onClose: () => void
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ expense, onClose }) => {
  const { createExpense, updateExpense, loading } = useExpenses()
  const isEditing = !!expense

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ExpenseFormData>()

  useEffect(() => {
    if (expense) {
      reset({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        description: expense.description || '',
        date: format(new Date(expense.date), 'yyyy-MM-dd')
      })
    } else {
      reset({
        title: '',
        amount: 0,
        category: 'Food & Dining',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd')
      })
    }
  }, [expense, reset])

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      if (isEditing) {
        await updateExpense(expense._id, data)
      } else {
        await createExpense(data)
      }
      onClose()
    } catch (error) {
      // Error is handled in the context
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 1, message: 'Title must be at least 1 character' },
                  maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
                })}
                type="text"
                className="input pl-10 w-full"
                placeholder="Enter expense title"
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than 0' },
                  max: { value: 999999.99, message: 'Amount cannot exceed 999,999.99' }
                })}
                type="number"
                step="0.01"
                min="0.01"
                className="input pl-10 w-full"
                placeholder="₹0.00"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                {...register('category', { required: 'Category is required' })}
                className="input pl-10 w-full"
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('date', { required: 'Date is required' })}
                type="date"
                className="input pl-10 w-full"
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description', {
                maxLength: { value: 500, message: 'Description cannot exceed 500 characters' }
              })}
              rows={3}
              className="input w-full resize-none"
              placeholder="Optional description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary btn-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary btn-md"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                isEditing ? 'Update Expense' : 'Add Expense'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseModal
