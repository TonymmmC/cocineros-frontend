import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductosPage from './pages/ProductosPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'productos' && <ProductosPage />}
      {currentPage === 'login' && <LoginPlaceholder />}
    </>
  )
}

function HomePage({ onNavigate }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary-600 mb-4">
          🍽️ Cocineros Bolivia
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Plataforma de comida casera hecha con amor
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <div className="card hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-3">Para Clientes</h3>
            <p className="text-gray-600">
              Descubre comida casera deliciosa cerca de ti
            </p>
          </div>
          
          <div className="card hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-semibold mb-3">Para Cocineros</h3>
            <p className="text-gray-600">
              Comparte tu talento culinario y genera ingresos
            </p>
          </div>
          
          <div className="card hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Entrega Rápida</h3>
            <p className="text-gray-600">
              Recibe tus pedidos frescos y a tiempo
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onNavigate('productos')}
            className="btn-primary text-lg px-8 py-3"
          >
            Explorar Productos
          </button>
          <button 
            onClick={() => onNavigate('login')}
            className="btn-secondary text-lg px-8 py-3"
          >
            Registrarme
          </button>
        </div>
      </div>
    </div>
  )
}

function LoginPlaceholder() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto card">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <p className="text-gray-600">Próximamente: Login con Laravel Sanctum</p>
      </div>
    </div>
  )
}

export default App