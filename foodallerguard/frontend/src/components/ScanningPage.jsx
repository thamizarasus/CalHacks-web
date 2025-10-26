import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import { scanMenu } from '../lib/api'
import TopNavTabs from './TopNavTabs'

function ScanningPage() {
  const { selectedAllergies, selectedImage, setScanResults } = useScan()
  const [isDone, setIsDone] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedImage || selectedAllergies.length === 0) {
      navigate("/")
    }
  }, [selectedImage, selectedAllergies, navigate])

  // Countdown timer - only navigate when scan is done and results are available
  useEffect(() => {
    if (isDone) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            navigate("/results")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isDone, navigate])

  useEffect(() => {
    const fetchScanResults = async () => {
      try {
        console.log('Starting scan with allergies:', selectedAllergies)
        const result = await scanMenu(selectedAllergies)
        console.log('Scan result received:', result)
        const formattedResults = {
          score: result.score,
          riskLevel: result.score >= 70 ? 'Low Risk' : result.score >= 40 ? 'Medium Risk' : 'High Risk',
          menu: result.menu, // Send menu items as strings
          riskyItems: result.riskyItems, // Keep risky items info
          safeItems: result.safeItems, // Keep safe items
          unsafe: result.riskyItems.map(item => {
            // Extract allergen name from "Contains {allergen}" format
            const allergen = item.reason.replace('Contains ', '').toLowerCase()
            return {
              name: item.item,
              allergen: allergen,
              emoji: '⚠️'
            }
          }),
          safe: result.safeItems
        }
        console.log('Formatted results:', formattedResults)
        setScanResults(formattedResults)
        setIsDone(true)
      } catch (error) {
        console.error('Error scanning menu:', error)
        console.error('Error details:', error.message, error.stack)
        alert(`Failed to scan menu. Error: ${error.message}`)
        navigate("/")
      }
    }

    const timer = setTimeout(fetchScanResults, 3500)
    return () => clearTimeout(timer)
  }, [selectedAllergies, setScanResults, navigate])

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
            {/* Animated Scanner with Pulsing Rings */}
            <div className="relative flex items-center justify-center h-64 mb-8">
              {/* Pulsing rings */}
              <div className="absolute w-64 h-64 rounded-full border-4 border-[#A64B29] opacity-75 animate-ping"></div>
              <div className="absolute w-48 h-48 rounded-full border-4 border-[#A64B29] opacity-50 animate-ping" style={{ animationDelay: '150ms' }}></div>
              <div className="absolute w-32 h-32 rounded-full border-4 border-[#A64B29] opacity-30 animate-ping" style={{ animationDelay: '300ms' }}></div>

              {/* Core scanner dot */}
              <div className="w-16 h-16 rounded-full bg-[#A64B29] shadow-lg animate-pulse"></div>
            </div>

            {/* Status Text */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Analyzing Allergens…
            </h3>
            <p className="text-gray-600 mb-6">
              {isDone ? 'Scan complete! Redirecting to results...' : 'Identifying dangerous items...'}
            </p>

            {/* Countdown Timer - only show when scan is done */}
            {isDone && (
              <div className="flex flex-col items-center mt-8 gap-3">
                <p className="text-gray-900 text-lg font-medium">
                  Scan complete in: <span className="font-bold text-[#A64B29]">{countdown}</span>s
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-red-600 rounded-full font-semibold shadow transition-colors"
                >
                  Stop Scan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanningPage
