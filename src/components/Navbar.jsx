import { ShoppingBag, Home, User, ChefHat } from 'lucide-react'

function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ChefHat className="w-8 h-8" />
            <span className="text-xl font-bold">Cocineros Bolivia</span>
          </button>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Inicio</span>
            </button>

            <button
              onClick={() => onNavigate('productos')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'productos'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Productos</span>
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Ingresar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar