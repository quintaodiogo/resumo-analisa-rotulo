"use client"

import { motion } from "framer-motion"

export function DemoImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Rótulo Analisado</h3>
        <div className="relative">
          <img
            src="/img/rotuloLeite.png"
            alt="Rótulo de Leite UHT Integral - Leitíssimo"
            width={400}
            height={300}
            className="rounded-lg shadow-md object-cover w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 text-sm">Leite UHT Integral</h4>
              <p className="text-xs text-gray-600">Leitíssimo • 1L</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Análise Concluída</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}