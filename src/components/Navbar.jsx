import { ShoppingBag, Home, ChefHat, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'cocineros', label: 'Cocineros', icon: ChefHat },
    { id: 'productos', label: 'Productos', icon: ShoppingBag },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 group"
          >
            <ChefHat className="w-7 h-7 text-primary-600 dark:text-primary-500" strokeWidth={2} />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Cocineros</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Ingresar
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-500 bg-gray-50 dark:bg-gray-800'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}

              <button
                onClick={() => {
                  onNavigate('login')
                  setMobileMenuOpen(false)
                }}
                className="mx-4 mt-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md"
              >
                Ingresar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar