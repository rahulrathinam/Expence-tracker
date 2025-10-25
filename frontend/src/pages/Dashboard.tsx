import { useEffect } from 'react'
import { useExpenses } from '../contexts/ExpenseContext'
import { useAuth } from '../contexts/AuthContext'
import { format } from 'date-fns'
import { 
  DollarSign, 
  TrendingUp, 
  Receipt, 
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { expenses, stats, loading, fetchStats } = useExpenses()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const recentExpenses = expenses.slice(0, 5)
  const totalThisMonth = stats?.totalExpenses.total || 0
  const expenseCount = stats?.totalExpenses.count || 0

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Food & Dining': '🍽️',
      'Transportation': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Healthcare': '🏥',
      'Education': '📚',
      'Bills & Utilities': '⚡',
      'Travel': '✈️',
      'Other': '📝'
    }
    return icons[category] || '📝'
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Entertainment': 'bg-purple-100 text-purple-800',
      'Shopping': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Education': 'bg-green-100 text-green-800',
      'Bills & Utilities': 'bg-yellow-100 text-yellow-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-blue-600 rounded-lg p-4 text-white">
        <h1 className="text-2xl font-bold mb-1">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-blue-100">
          Here's your expense overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{totalThisMonth.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-xl font-bold text-gray-900">{expenseCount}</p>
              </div>
              <Receipt className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-bold text-gray-900">
                  {new Date().toLocaleDateString('en-US', { month: 'long' })}
                </p>
              </div>
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average per Transaction</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{expenseCount > 0 ? (totalThisMonth / expenseCount).toFixed(2) : '0.00'}
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="card-content space-y-3">
            <Link
              to="/expenses"
              className="flex items-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Plus className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Add New Expense</p>
                <p className="text-sm text-gray-600">Record a new expense</p>
              </div>
            </Link>

            <Link
              to="/analytics"
              className="flex items-center p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
            >
              <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-600">Analyze spending patterns</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          </div>
          <div className="card-content">
            {recentExpenses.length > 0 ? (
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div key={expense._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getCategoryIcon(expense.category)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{expense.title}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(expense.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{expense.amount.toFixed(2)}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Link
                    to="/expenses"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all expenses →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Receipt className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-3">No expenses yet</p>
                <Link
                  to="/expenses"
                  className="btn-primary btn-sm"
                >
                  Add your first expense
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {stats?.expensesByCategory && stats.expensesByCategory.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Expenses by Category</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.expensesByCategory.slice(0, 6).map((category) => (
                  <div key={category._id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{getCategoryIcon(category._id)}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category._id)}`}>
                        {category._id}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">₹{category.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{category.count} transactions</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
