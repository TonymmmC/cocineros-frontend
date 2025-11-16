import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductosPage from './pages/ProductosPage'
import LoginPage from './pages/LoginPage'
import CocinerosPage from './pages/CocinerosPage'
import CocineroPerfilPage from './pages/CocineroPerfilPage'
import OrdersPage from './pages/OrdersPage'
import ChefDashboard from './pages/ChefDashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCocineroId, setSelectedCocineroId] = useState(null)

  const handleNavigate = (page, cocineroId = null) => {
    setCurrentPage(page)
    setSelectedCocineroId(cocineroId)
  }

  return (
    <div className="min-h-screen bg-background">
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
      {currentPage === 'mis-pedidos' && <OrdersPage />}
      {currentPage === 'chef-dashboard' && <ChefDashboard />}

      <Toaster />
    </div>
  )
}

function RegisterPlaceholder({ onNavigate }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>Próximamente: Formulario de registro</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => onNavigate('login')}
              className="w-full"
            >
              Volver al login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
