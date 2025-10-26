import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import AllergySelector from './AllergySelector'
import UploadCard from './UploadCard'
import TopNavTabs from './TopNavTabs'
import { getAllergens, clearScanHistory } from '../lib/api'

function HomePage() {
  const navigate = useNavigate()
  const { selectedAllergies, setSelectedAllergies, selectedImage, setSelectedImage } = useScan()
  const [allergens, setAllergens] = useState([])
  const [recentScans, setRecentScans] = useState([])

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
    
    // Load recent scans from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('recentScans') || '[]')
      setRecentScans(saved)
    } catch (error) {
      console.error('Failed to load recent scans:', error)
    }
  }, [])

  const startScanning = () => {
    if (selectedAllergies.length === 0) {
      alert("Please select at least one allergy before scanning.")
      return
    }
    navigate("/scanning")
  }

  const handleClearHistory = async () => {
    try {
      await clearScanHistory()
      setRecentScans([])
      localStorage.removeItem('recentScans')
    } catch (error) {
      console.error('Failed to clear history:', error)
      alert('Failed to clear history')
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

          {/* Latest Scans Section */}
          <div className="mt-10 p-6 rounded-2xl bg-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                📌 Latest Scans
              </h3>
              {recentScans.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition"
                >
                  Clear History
                </button>
              )}
            </div>

            {recentScans.length === 0 ? (
              <p className="text-gray-500">No scans yet — try uploading a menu!</p>
            ) : (
              <div className="space-y-3">
                {recentScans.map((scan, index) => {
                  const badgeColor =
                    scan.score >= 80 ? "bg-green-500" :
                    scan.score >= 50 ? "bg-yellow-500" :
                    "bg-red-500"

                  return (
                    <button
                      key={index}
                      onClick={() => navigate("/results")}
                      className="w-full text-left bg-white p-4 rounded-xl shadow border hover:bg-gray-100 transition"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-700 truncate">
                          {scan.menu ? scan.menu.join(", ") : "Menu"}
                        </div>

                        <span className={`text-white px-3 py-1 rounded-lg ${badgeColor}`}>
                          {scan.score}%
                        </span>
                      </div>

                      <div className="text-sm text-gray-500 mt-1">
                        {scan.time || 'Recent'}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
