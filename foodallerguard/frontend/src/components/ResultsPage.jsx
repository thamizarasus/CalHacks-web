import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import TopNavTabs from './TopNavTabs'

function ResultsPage() {
  const { scanResults } = useScan()
  const navigate = useNavigate()

  useEffect(() => {
    if (!scanResults) {
      navigate("/")
    }
  }, [scanResults, navigate])

  // Use scanResults from context, with fallback to sample data
  const data = scanResults || {
    score: 78,
    riskLevel: 'Low Risk',
    menu: [
      { text: 'Garden Salad', price: '$8' },
      { text: 'Fries', price: '$4' },
      { text: 'Buffalo Wings', price: '$12', hasAllergen: true, allergen: 'dairy' },
      { text: 'Grilled Chicken', price: '$14' },
      { text: 'Peanut Satay', price: '$10', hasAllergen: true, allergen: 'peanuts' },
      { text: 'Crab Cakes', price: '$16', hasAllergen: true, allergen: 'shellfish' }
    ],
    unsafe: [
      { name: 'Buffalo Wings', emoji: '🧀', allergen: 'dairy' },
      { name: 'Peanut Satay', emoji: '🥜', allergen: 'peanuts' },
      { name: 'Crab Cakes', emoji: '🦐', allergen: 'shellfish' }
    ],
    safe: [
      'Garden Salad',
      'Fries',
      'Grilled Chicken'
    ]
  }

  const allergenEmojiMap = {
    'dairy': '🧀',
    'peanuts': '🥜',
    'shellfish': '🦐',
    'nuts': '🥜',
    'eggs': '🥚',
    'soy': '🌱',
    'wheat': '🌾',
    'fish': '🐟',
    'sesame': '✴️'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodAllerGuard
          </h1>
          <div className="mt-6 mb-10">
            <TopNavTabs active="results" />
          </div>
          <p className="text-lg text-gray-600">
            View your scan results
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Safety Score Card */}
              <div className="bg-gradient-to-br from-[#DAFBE5] to-white rounded-3xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Menu Safety Score</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-green-700">{data.score}%</span>
                  <span className="bg-green-400 text-white px-3 py-1 rounded-xl text-sm font-medium">
                    {data.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Based on your selected allergens</p>
              </div>

              {/* Scanned Menu Card */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scanned Menu</h3>
                <p className="text-center text-gray-700 mb-4">Restaurant Menu</p>
                <div className="space-y-2">
                  {data.menu.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                        item.hasAllergen
                          ? 'bg-red-100 border-l-4 border-red-500'
                          : 'bg-white'
                      }`}
                    >
                      <span className="text-sm text-gray-900">{item.text}</span>
                      <span className="text-sm text-gray-600">{item.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">Risk items highlighted in red</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              {/* Avoid These Card */}
              <div className="bg-white border-2 border-red-200 rounded-3xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-red-700">Avoid These</h3>
                </div>
                <div className="space-y-3">
                  {data.unsafe.map((item, index) => (
                    <div key={index} className="bg-red-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{item.name}</span>
                        <span className="text-lg">{item.emoji}</span>
                      </div>
                      <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        Contains {item.allergen}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Safe Options Card */}
              <div className="bg-green-50 rounded-3xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-700">Safe Options</h3>
                </div>
                <div className="space-y-3">
                  {data.safe.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer Card */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Important Disclaimer</h4>
                    <p className="text-sm text-gray-700">
                      Results may not include all allergens. Always double-check with restaurant staff.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scan Another Menu Button */}
              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#A64B29] hover:bg-[#8B3E24] text-white py-4 px-6 rounded-3xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#A64B29] focus:ring-offset-2 flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>Scan Another Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage