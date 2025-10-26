import { AlertTriangle } from 'lucide-react'

interface DeleteModalProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  loading = false
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onCancel}
              className="btn-secondary btn-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="btn-danger btn-md"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </div>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal


