"use client"

import { motion } from "framer-motion"
import { Camera } from "lucide-react"

import { DemoResults } from "@/components/demo-results"

export default function DemoPage() {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-medium"
            >
              <Camera className="w-5 h-5" />
              <span>🎯 Demonstração do AnalisaRótulo</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Análise do Rótulo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Veja como nossa IA analisa um rótulo de <strong>Leite UHT Integral</strong> e extrai informações importantes em segundos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">O que você verá nesta demonstração:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Análise completa de ingredientes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Informações nutricionais detalhadas</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Demo Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <DemoResults />
        </motion.div>
      </div>
  )
}
