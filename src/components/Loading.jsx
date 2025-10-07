function Loading({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-lg text-gray-600">{message}</p>
    </div>
  )
}

export default Loading