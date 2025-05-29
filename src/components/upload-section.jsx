import { motion } from "framer-motion"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function UploadSection({ uploadedImage, isAnalyzing, onImageUpload, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="mb-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div className="text-center">
            {!uploadedImage ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enviar Rótulo do Produto</h3>
                <p className="text-gray-600 mb-6">Arraste e solte uma imagem ou clique para navegar</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:items-center sm:justify-center">
                  <label htmlFor="image-upload">
                    <Button className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                      Escolher Imagem
                    </Button>
                  </label>
                  <div>
                    <a href="/demo">
                      <Button variant="outline" className="w-full sm:w-auto sm:ml-4">
                        Ver Demonstração
                      </Button>
                    </a>
                  </div>
                </div>
                <input id="image-upload" type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="text-gray-600">Analisando rótulo com IA...</span>
                  </motion.div>
                )}
                <label htmlFor="image-upload-new">
                  <Button variant="outline" className="cursor-pointer">
                    Enviar Imagem Diferente
                  </Button>
                </label>
                <input id="image-upload-new" type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}