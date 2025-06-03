import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"
import { Alert, AlertDescription } from "./components/ui/alert"
import { Card, CardContent } from "./components/ui/card"
import { Button } from "./components/ui/button"
import LoadingAnimation from "./components/LoadingAnimation"
import { ResultsCard } from "./components/ResultsCard.jsx"
import { UploadSection } from "./components/UploadSection.jsx"

export default function LabelAnalyzer() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("A imagem deve ter menos de 10MB")
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result)
        analyzeImage(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true)
    setError(null)
    setAnalysisResult(null)
    try {
      const res = await fetch(imageData)
      const blob = await res.blob()
      const formData = new FormData()
      formData.append("file", blob, "rotulo.png")
      const response = await fetch("https://backend-resumo-analisarotulo-production.up.railway.app/upload", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Erro ao analisar imagem")
      const data = await response.json()
      if (data.json_result && typeof data.json_result === "object") {
        setAnalysisResult(data.json_result)
      } else if (typeof data.json_result === "string") {
        setAnalysisResult(JSON.parse(data.json_result))
      } else {
        throw new Error("Resposta inesperada do backend")
      }
    } catch (err) {
      setError("Erro ao processar a análise: " + (err.message || ""))
    }
    setIsAnalyzing(false)
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setAnalysisResult(null)
    setError(null)
    setIsAnalyzing(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="mb-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
          <CardContent className="p-8">
            <div className="text-center">
              {/* Upload inicial */}
              {!uploadedImage && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                  <UploadSection
                    uploadedImage={uploadedImage}
                    isAnalyzing={isAnalyzing}
                    onImageUpload={handleImageUpload}
                    onReset={resetAnalysis}
                  />                </motion.div>
              )}

              {/* Loading Animation */}
              {uploadedImage && isAnalyzing && (
                <LoadingAnimation />
              )}

              {/* Imagem enviada */}
              {uploadedImage && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative max-w-md mx-auto">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Rótulo do produto enviado"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                    <Button
                      onClick={resetAnalysis}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90 cursor-pointer hover:bg-gray-100"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
          {analysisResult && !isAnalyzing && (
            <ResultsCard data={analysisResult} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
