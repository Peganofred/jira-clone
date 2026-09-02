import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold text-gray-300 mb-4">404</h2>
      <p className="text-gray-600 mb-6">Page nahi mili 😕</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage
