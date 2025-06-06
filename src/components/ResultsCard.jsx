"use client"

import { motion } from "framer-motion"
import { Leaf, ChefHat, Shield, CheckCircle, AlertTriangle } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ImageCard } from "./ImageCard"

export function ResultsCard({ data, imgSrc }) {
  if (!data) return null

  const getCategoryIcon = (category) => {
    switch (category) {
      case "calories":
      case "fat":
        return Shield
      case "protein":
        return ChefHat
      case "minerals":
        return Shield
      default:
        return ChefHat
    }
  }

  return (
    <>

      {imgSrc && (
        <ImageCard
          imgSrc={imgSrc}
          productName={data.productName}
          productDescription={data.productDescription}
          status={data.status}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Análise Concluída</h3>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800">{data.productName}</h4>
            <p className="text-gray-600">Marca: {data.brand}</p>
          </div>
          <p className="text-gray-600">Aqui está o que encontramos no seu rótulo</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Ingredientes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <Card className="h-full rounded-2xl shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Ingredientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                      <p className="text-sm text-gray-600">{ingredient.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
          {/* Informações Nutricionais */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <Card className="h-full rounded-2xl shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-orange-600" />
                  </div>
                  <span>Informações Nutricionais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.nutrition.map((nutrient, index) => {
                  const IconComponent = getCategoryIcon(nutrient.category)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-gray-900">{nutrient.label}</span>
                      </div>
                      <span className="text-gray-600 font-medium">{nutrient.value}</span>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="h-full"
          >
            <Card className="h-full rounded-2xl shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Alegações e Avisos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Alegações do Produto</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.additionalInfo.claims.map((claim, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      >
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {claim}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Avisos Importantes</h4>
                  <div className="space-y-2">
                    {data.additionalInfo.warnings.map((warning, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-2 p-2 bg-yellow-50 rounded border border-yellow-200"
                      >
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-yellow-800">{warning}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="h-full"
          >
            <Card className="h-full rounded-2xl shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-gray-600" />
                  </div>
                  <span>Informações de Uso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">Tamanho da Porção: </span>
                  <span className="text-gray-600">{data.additionalInfo.servingSize}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">Armazenamento: </span>
                  <span className="text-gray-600">{data.additionalInfo.storageInstructions}</span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
