import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductosPage from './pages/ProductosPage'
import LoginPage from './pages/LoginPage'
import ApiTestPage from './pages/ApiTestPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'productos' && <ProductosPage />}
      {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
      {currentPage === 'register' && <RegisterPlaceholder onNavigate={setCurrentPage} />}
    </div>
  )
}

function RegisterPlaceholder({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto card">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Registro</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Próximamente: Formulario de registro</p>
          <button 
            onClick={() => onNavigate('login')}
            className="btn-secondary"
          >
            Volver al login
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

// REFACTOR SUGGESTIONS:
// 1. Implementar React Router para rutas reales en lugar de estado
// 2. Crear página de Register real conectada al backend
// 3. Agregar layout component para evitar repetir Navbar
// 4. Implementar context para autenticación global