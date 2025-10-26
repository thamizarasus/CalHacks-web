import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import { allergenIcon, saveScan } from '../lib/api'
import TopNavTabs from './TopNavTabs'

function ResultsPage() {
  const { scanResults } = useScan()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!scanResults) {
      navigate("/")
    }
  }, [scanResults, navigate])

  // Save scan data to localStorage when results are available
  useEffect(() => {
    if (!scanResults || saved) return

    const scanData = {
      menu: scanResults.menu || [],
      dangerous: scanResults.riskyItems || [],
      score: scanResults.score || 0,
      time: new Date().toLocaleString()
    }

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('recentScans') || '[]')
      const updated = [scanData, ...existing].slice(0, 5) // Keep last 5 scans
      localStorage.setItem('recentScans', JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save scan:', error)
    }

    setSaved(true)
  }, [scanResults, saved])

  // Get scanResults from context
  const result = scanResults

  if (!result || !result.menu) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
            No scanned menu found. Please upload a menu first.
          </div>
        </div>
      </div>
    )
  }

  // Convert menu items to proper format
  const menu = result.menu.map(item => {
    if (typeof item === 'string') {
      // Check if this item is in the risky items list
      const riskyItem = result.riskyItems?.find(r => r.item === item)
      return {
        name: item,
        isRisk: !!riskyItem,
        allergen: riskyItem?.reason || null
      }
    }
    return item
  })

  const riskyItems = menu.filter(m => m.isRisk)
  const safeItems = menu.filter(m => !m.isRisk)

  // Group dangerous items by allergen
  const groupedByAllergen = result.riskyItems?.reduce((acc, item) => {
    // Extract allergen name from "Contains {allergen}" format
    const allergen = item.reason.replace('Contains ', '').toLowerCase()
    if (!acc[allergen]) {
      acc[allergen] = []
    }
    acc[allergen].push(item.item)
    return acc
  }, {}) || {}

  const data = {
    score: result.score || 0,
    riskLevel: result.riskLevel || 'Low Risk',
    menu: menu,
    unsafe: riskyItems.map(item => ({
      name: typeof item === 'string' ? item : item.name,
      emoji: '⚠️',
      allergen: typeof item === 'string' ? 'allergen' : (item.allergen || 'allergen')
    })),
    safe: safeItems.map(item => typeof item === 'string' ? item : item.name)
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
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Scanned Menu</h2>
                <div className="space-y-3">
                  {data.menu.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-2 rounded-lg text-gray-800 ${
                        item.isRisk 
                          ? "bg-red-100 border border-red-300" 
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {typeof item === 'string' ? item : item.name}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  Risk items highlighted in red
                </p>
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
                
                {/* Grouped by allergen */}
                <div className="space-y-4">
                  {Object.keys(groupedByAllergen).map((allergen) => {
                    const count = groupedByAllergen[allergen].length

                    return (
                      <div key={allergen} className="border border-red-300 rounded-2xl bg-red-50 p-4 shadow-sm">
                        <h4 className="text-red-700 font-semibold text-base mb-3 flex items-center gap-2">
                          <span>❌</span>
                          <span>{allergen.charAt(0).toUpperCase() + allergen.slice(1)} Allergy</span>
                          <span className="text-red-500 text-sm bg-red-100 rounded-full px-2 py-1">
                            {count} {count === 1 ? "item" : "items"}
                          </span>
                        </h4>

                        <div className="space-y-2">
                          {groupedByAllergen[allergen].map((itemName, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex justify-between items-center bg-white rounded-xl p-3 border border-red-200"
                            >
                              <span className="text-red-600 font-medium">{itemName}</span>
                              <span className="text-yellow-500 text-xl">⚠️</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
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
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✅</span>
                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                      </div>
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
                onClick={() => {
                  if (!saved) setSaved(true)
                  navigate("/")
                }}
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