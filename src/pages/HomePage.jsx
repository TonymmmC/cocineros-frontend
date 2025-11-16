import { Search, Clock, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
    <div className="min-h-screen">
      {/* Hero Section with Banner */}
      <section className="relative">
        <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Comida casera hecha con amor
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed drop-shadow-lg">
              Conectamos a cocineros talentosos con personas que buscan comida casera de calidad
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('productos')}
                className="shadow-xl"
              >
                Explorar productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => onNavigate('cocineros')}
                className="shadow-xl"
              >
                Ver cocineros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tres simples pasos para disfrutar de la mejor comida casera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                    <Icon className="w-8 h-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Eres cocinero?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y comienza a compartir tu talento culinario con tu comunidad
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('login')}
          >
            Comenzar ahora
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
