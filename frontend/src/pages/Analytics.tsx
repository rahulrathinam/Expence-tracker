import { useEffect, useState } from 'react'
import { useExpenses } from '../contexts/ExpenseContext'
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

const Analytics: React.FC = () => {
  const { stats, loading, fetchStats } = useExpenses()
  const [dateRange, setDateRange] = useState({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  })

  useEffect(() => {
    fetchStats(dateRange.startDate, dateRange.endDate)
  }, [fetchStats, dateRange])

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }))
  }

  const getCategoryColor = (index: number) => {
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
    ]
    return colors[index % colors.length]
  }

  // Category breakdown chart data
  const categoryData = {
    labels: stats?.expensesByCategory.map(cat => cat._id) || [],
    datasets: [
      {
        data: stats?.expensesByCategory.map(cat => cat.total) || [],
        backgroundColor: stats?.expensesByCategory.map((_, index) => getCategoryColor(index)) || [],
        borderWidth: 0,
      },
    ],
  }

  // Monthly expenses chart data
  const monthlyData = {
    labels: stats?.monthlyExpenses.map(month => 
      format(new Date(month._id.year, month._id.month - 1), 'MMM yyyy')
    ).reverse() || [],
    datasets: [
      {
        label: 'Expenses',
        data: stats?.monthlyExpenses.map(month => month.total).reverse() || [],
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Insights into your spending patterns</p>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                className="input w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                className="input w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{stats?.totalExpenses.total.toLocaleString() || '0'}
                </p>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalExpenses.count || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average per Transaction</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{stats && stats.totalExpenses.count > 0 
                    ? (stats.totalExpenses.total / stats.totalExpenses.count).toFixed(2)
                    : '0.00'
                  }
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Expenses by Category</h3>
            </div>
          </div>
          <div className="card-content">
            <div className="h-80">
              {stats?.expensesByCategory && stats.expensesByCategory.length > 0 ? (
                <Doughnut data={categoryData} options={doughnutOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No data available for the selected period
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly Trend</h3>
            </div>
          </div>
          <div className="card-content">
            <div className="h-80">
              {stats?.monthlyExpenses && stats.monthlyExpenses.length > 0 ? (
                <Line data={monthlyData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No data available for the selected period
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Details */}
      {stats?.expensesByCategory && stats.expensesByCategory.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {stats.expensesByCategory.map((category, index) => {
                const percentage = stats.totalExpenses.total > 0 
                  ? (category.total / stats.totalExpenses.total) * 100 
                  : 0
                
                return (
                  <div key={category._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: getCategoryColor(index) }}
                      />
                      <span className="font-medium text-gray-900">{category._id}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{category.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{category.count} transactions</p>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: getCategoryColor(index)
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Analytics
