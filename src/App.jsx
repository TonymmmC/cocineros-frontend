import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductosPage from './pages/ProductosPage'
import LoginPage from './pages/LoginPage'
import CocinerosPage from './pages/CocinerosPage'
import CocineroPerfilPage from './pages/CocineroPerfilPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCocineroId, setSelectedCocineroId] = useState(null)

  const handleNavigate = (page, cocineroId = null) => {
    setCurrentPage(page)
    setSelectedCocineroId(cocineroId)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'productos' && <ProductosPage />}
      {currentPage === 'cocineros' && <CocinerosPage onNavigate={handleNavigate} />}
      {currentPage === 'cocinero-perfil' && selectedCocineroId && (
        <CocineroPerfilPage
          cocineroId={selectedCocineroId}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'register' && <RegisterPlaceholder onNavigate={handleNavigate} />}
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