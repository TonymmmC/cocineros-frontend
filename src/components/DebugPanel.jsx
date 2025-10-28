import { useState } from 'react';
import { Bug, X } from 'lucide-react';

export default function DebugPanel({ data, title = "Debug Data" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Solo mostrar en desarrollo
  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all"
          title="Abrir Debug Panel"
        >
          <Bug className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 w-96 max-h-96 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-purple-600 text-white">
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              <h3 className="font-semibold text-sm">{title}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-purple-700 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-auto p-3">
            <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={() => {
                console.log(`[${title}]`, data);
                alert('Datos enviados a la consola');
              }}
              className="w-full text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-1 px-2 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              📋 Copiar a consola
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
