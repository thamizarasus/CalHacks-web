import React, { useState, useEffect } from 'react'
import AllergySelector from './components/AllergySelector'
import UploadCard from './components/UploadCard'
import Results from './components/Results'
import { getAllergens, checkIngredients } from './lib/api'

function App() {
  const [allergens, setAllergens] = useState([])
  const [selectedAllergens, setSelectedAllergens] = useState([])
  const [ingredients, setIngredients] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const data = await getAllergens()
        setAllergens(data)
      } catch (error) {
        console.error('Failed to fetch allergens:', error)
      }
    }

    fetchAllergens()
  }, [])

  const handleCheckIngredients = async () => {
    if (!ingredients.trim() || selectedAllergens.length === 0) {
      alert('Please select allergens and enter ingredients to check')
      return
    }

    setLoading(true)
    try {
      const ingredientsList = ingredients
        .split('\n')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0)

      const data = await checkIngredients(selectedAllergens, ingredientsList)
      setResults(data)
    } catch (error) {
      console.error('Failed to check ingredients:', error)
      alert('Failed to check ingredients. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodAllerGuard
          </h1>
          <p className="text-lg text-gray-600">
            Check your food ingredients for allergens
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <AllergySelector
            allergens={allergens}
            selectedAllergens={selectedAllergens}
            onSelectionChange={setSelectedAllergens}
          />

          <UploadCard
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            onCheckIngredients={handleCheckIngredients}
            loading={loading}
          />

          {results && (
            <Results results={results} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
