import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import AllergySelector from './AllergySelector'
import UploadCard from './UploadCard'
import Results from './Results'
import TopNavTabs from './TopNavTabs'
import { getAllergens, checkIngredients } from '../lib/api'

function HomePage() {
  const navigate = useNavigate()
  const { selectedAllergies, setSelectedAllergies, selectedImage, setSelectedImage } = useScan()
  const [allergens, setAllergens] = useState([])
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

  const startScanning = () => {
    if (selectedAllergies.length === 0) {
      alert("Please select at least one allergy before scanning.")
      return
    }
    navigate("/scanning")
  }

  const handleCheckIngredients = async () => {
    if (!ingredients.trim() || selectedAllergies.length === 0) {
      alert('Please select allergens and enter ingredients to check')
      return
    }

    setLoading(true)
    try {
      const ingredientsList = ingredients
        .split('\n')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0)

      const data = await checkIngredients(selectedAllergies, ingredientsList)
      setResults(data)
    } catch (error) {
      console.error('Failed to check ingredients:', error)
      alert('Failed to check ingredients. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodAllerGuard
          </h1>
          <div className="mt-6 mb-10">
            <TopNavTabs active="home" />
          </div>
          <p className="text-lg text-gray-600">
            Check your food ingredients for allergens
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <section className="my-10">
            <h2 className="text-2xl font-semibold mb-2">Select Your Allergies</h2>
            <p className="text-gray-600 mb-6">
              Choose the allergens you need to avoid. We'll check your ingredients against these.
            </p>

            {/* Allergy selection buttons */}
            <AllergySelector
              allergens={allergens}
              selectedAllergens={selectedAllergies}
              onSelectionChange={setSelectedAllergies}
            />
          </section>

          <div className="space-y-8">

          <UploadCard
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            onCheckIngredients={handleCheckIngredients}
            loading={loading}
            onFileSelect={(file) => setSelectedImage(file)}
            onStartScan={startScanning}
            hasSelectedAllergens={selectedAllergies.length > 0}
          />

          {results && (
            <Results results={results} />
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
