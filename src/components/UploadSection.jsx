import { useRef } from "react"
import { motion } from "framer-motion"
import { Upload, X } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingAnimation from "./LoadingAnimation"

export function UploadSection({ uploadedImage, isAnalyzing, onImageUpload, onReset }) {
  const fileInputRef = useRef(null)
  const fileInputNewRef = useRef(null)

  return (
    <div className="text-center">
      {!uploadedImage ? (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Enviar Rótulo do Produto</h3>
          <p className="text-gray-600 mb-6">Arraste e solte uma imagem ou clique para navegar</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:items-center sm:justify-center">
            <Button
              className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              Escolher Imagem
            </Button>
            <div>
              <Link to="/demo">
                <Button variant="outline" className="w-full sm:w-auto sm:ml-4">
                  Ver Demonstração
                </Button>
              </Link>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
          <p className="text-sm text-gray-500 mt-2">Máximo 10MB • JPG, PNG, WEBP</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <h2>koadkod</h2>
            <img
              src={uploadedImage || "/placeholder.svg"}
              alt="Rótulo do produto enviado"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover w-full"
            />
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {isAnalyzing && (
            <LoadingAnimation currentStep={currentStep} />
          )}
        </motion.div>
      )}
    </div>
  )
}
