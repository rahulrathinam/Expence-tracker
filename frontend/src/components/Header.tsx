import { useAuth } from '../contexts/AuthContext'
import { LogOut } from 'lucide-react'

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* User menu */}
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            </div>
            
            <div className="h-7 w-7 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
