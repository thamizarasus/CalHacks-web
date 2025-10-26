import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNavTabs from './TopNavTabs'

function ScanningPage() {
  const [isDone, setIsDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true)
      navigate("/results")
    }, 3500) // Simulate 3.5s AI processing
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodAllerGuard
          </h1>
          <div className="mt-6 mb-10">
            <TopNavTabs active="scanning" />
          </div>
          <p className="text-lg text-gray-600">
            Scan your food for allergen detection
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Scanning Animation Card */}
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            {/* Animated Scanner Icon */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-[#A64B29] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-[#A64B29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>

            {/* Status Text */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Analyzing Ingredients...
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI is scanning your food for potential allergens
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-[#A64B29] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>

            {/* Scanning Stages */}
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-[#A64B29] rounded-full animate-pulse"></div>
                <span>Detecting ingredients...</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-400">Analyzing allergens...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanningPage
