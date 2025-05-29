import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ChefHat, Shield, Zap } from "lucide-react"

import { Alert, AlertDescription } from "../components/ui/alert"
import { UploadSection } from "../components/upload-section"

export default function LabelAnalyzer() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("A imagem deve ter menos de 10MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result
        setUploadedImage(imageData)
        analyzeImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true)
    setError(null)
    setAnalysisResult(null)
    // Sua lógica de análise aqui
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setAnalysisResult(null)
    setError(null)
    setIsAnalyzing(false)
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "calories":
      case "fat":
        return Zap
      case "protein":
        return ChefHat
      case "vitamins":
      case "minerals":
        return Shield
      default:
        return ChefHat
    }
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UploadSection
          uploadedImage={uploadedImage}
          isAnalyzing={isAnalyzing}
          onImageUpload={handleImageUpload}
          onReset={resetAnalysis}
        />

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="mb-8 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <div id="results-section">
          <AnimatePresence mode="wait">
            {analysisResult && (
              <motion.div
                key="real-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Análise Concluída</h3>
                  {analysisResult.productName && (
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold text-gray-800">{analysisResult.productName}</h4>
                      {analysisResult.brand && <p className="text-gray-600">Marca: {analysisResult.brand}</p>}
                    </div>
                  )}
                  <p className="text-gray-600">Aqui está o que encontramos no seu rótulo</p>
                </div>
                {/* Aqui viriam os componentes de resultado real */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  )
}