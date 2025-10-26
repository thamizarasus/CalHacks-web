import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import AllergySelector from './AllergySelector'
import UploadCard from './UploadCard'
import TopNavTabs from './TopNavTabs'
import { getAllergens } from '../lib/api'

function HomePage() {
  const navigate = useNavigate()
  const { selectedAllergies, setSelectedAllergies, selectedImage, setSelectedImage } = useScan()
  const [allergens, setAllergens] = useState([])

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        console.log('Fetching allergens...')
        const data = await getAllergens()
        console.log('Fetched allergens:', data)
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
          {/* Allergy selection buttons */}
          <AllergySelector
            allergens={allergens}
            selectedAllergens={selectedAllergies}
            onSelectionChange={setSelectedAllergies}
          />

          <div className="space-y-8">

          <UploadCard
            onFileSelect={(file) => setSelectedImage(file)}
            onStartScan={startScanning}
            hasSelectedAllergens={selectedAllergies.length > 0}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
