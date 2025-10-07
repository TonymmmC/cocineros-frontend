import { Users, ChefHat, Truck } from 'lucide-react'
import Button from '../components/Button'

function HomePage({ onNavigate }) {
  const features = [
    {
      icon: Users,
      title: 'Para Clientes',
      description: 'Descubre comida casera deliciosa cerca de ti',
    },
    {
      icon: ChefHat,
      title: 'Para Cocineros',
      description: 'Comparte tu talento culinario y genera ingresos',
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Recibe tus pedidos frescos y a tiempo',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Cocineros Bolivia
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Plataforma de comida casera hecha con amor
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => onNavigate('productos')}
              variant="primary"
              size="lg"
            >
              Explorar Productos
            </Button>
            <Button 
              onClick={() => onNavigate('login')}
              variant="secondary"
              size="lg"
            >
              Registrarme
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-6">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-3xl p-12 max-w-4xl mx-auto border border-primary-100 dark:border-primary-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Únete a nuestra comunidad de cocineros y clientes
          </p>
          <Button 
            onClick={() => onNavigate('login')}
            variant="primary"
            size="lg"
          >
            Crear cuenta gratis
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

// REFACTOR SUGGESTIONS:
// 1. Agregar estadísticas reales (número de cocineros, platos, etc)
// 2. Implementar sección de testimonios si hay datos disponibles
// 3. Agregar lazy loading para imágenes cuando se agreguen