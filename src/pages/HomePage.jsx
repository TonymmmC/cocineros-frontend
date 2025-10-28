import { Search, Clock, Star, ArrowRight } from 'lucide-react'

function HomePage({ onNavigate }) {
  const features = [
    {
      icon: Search,
      title: 'Busca',
      description: 'Encuentra cocineros y platos cerca de ti',
    },
    {
      icon: Clock,
      title: 'Ordena',
      description: 'Haz tu pedido de forma rápida y sencilla',
    },
    {
      icon: Star,
      title: 'Disfruta',
      description: 'Recibe comida casera de calidad',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Comida casera hecha con amor
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
              Conectamos a cocineros talentosos con personas que buscan comida casera de calidad
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('productos')}
                className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-50 transition-colors inline-flex items-center justify-center shadow-lg"
              >
                Explorar productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('cocineros')}
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors shadow-lg"
              >
                Ver cocineros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tres simples pasos para disfrutar de la mejor comida casera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-500 rounded-full mb-4">
                  <Icon className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Eres cocinero?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y comienza a compartir tu talento culinario con tu comunidad
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage