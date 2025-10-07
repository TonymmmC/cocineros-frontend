function Loading({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-6 text-base text-gray-600 font-medium">{message}</p>
    </div>
  )
}

export default Loading

// REFACTOR SUGGESTIONS:
// 1. Agregar variantes de tamaño (small, medium, large)
// 2. Considerar implementar skeleton loaders para mejor UX
// 3. Agregar prop para cambiar color del spinner si es necesario