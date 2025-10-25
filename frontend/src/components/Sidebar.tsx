import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Receipt, 
  BarChart3, 
  User,
  CreditCard,
  TrendingUp
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/expenses', icon: Receipt, label: 'Expenses' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Expense Tracker</h2>
            <p className="text-xs text-gray-500">Manage your finances</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-md">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Quick Stats</span>
          </div>
          <p className="text-xs text-gray-600">
            Track your spending patterns and save money.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
