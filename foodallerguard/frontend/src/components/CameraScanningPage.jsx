import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import { scanMenu } from '../lib/api'
import TopNavTabs from './TopNavTabs'

function CameraScanningPage() {
  const { selectedAllergies, setScanResults } = useScan()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (selectedAllergies.length === 0) {
      navigate("/")
    }
  }, [selectedAllergies, navigate])

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsStreaming(true)
      }
    } catch (err) {
      console.error('Camera error:', err)
      setError('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsScanning(true)
    
    try {
      // Capture frame from video
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      // Set canvas size to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw current frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Convert canvas to blob
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg', 0.8)
      })
      
      // Convert blob to base64 for API
      const base64 = await new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(blob)
      })
      
      // Send image to backend for processing
      const response = await fetch('/api/scan-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          allergens: selectedAllergies
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      // Format results similar to regular scanning
      const formattedResults = {
        score: result.score,
        riskLevel: result.score >= 70 ? 'Low Risk' : result.score >= 40 ? 'Medium Risk' : 'High Risk',
        menu: result.menu,
        riskyItems: result.riskyItems,
        safeItems: result.safeItems,
        unsafe: result.riskyItems.map(item => {
          const allergen = item.reason.replace('Contains ', '').toLowerCase()
          return {
            name: item.item,
            allergen: allergen,
            emoji: '⚠️',
            matchedKeyword: item.matched_keyword || ''
          }
        }),
        safe: result.safeItems,
        extractedText: result.extracted_text || '' // Include extracted text for debugging
      }
      
      setScanResults(formattedResults)
      
      // Save scan to localStorage
      const scanData = {
        menu: result.menu,
        dangerous: result.riskyItems,
        score: result.score,
        time: new Date().toLocaleString()
      }
      
      try {
        const existing = JSON.parse(localStorage.getItem('recentScans') || '[]')
        const updated = [scanData, ...existing].slice(0, 5)
        localStorage.setItem('recentScans', JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to save scan:', error)
      }
      
      // Stop camera and navigate to results
      stopCamera()
      navigate("/results")
      
    } catch (error) {
      console.error('Error scanning image:', error)
      setError(`Failed to scan image: ${error.message}`)
      setIsScanning(false)
    }
  }

  useEffect(() => {
    // Cleanup camera on unmount
    return () => {
      stopCamera()
    }
  }, [])

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
            Scan your menu with your camera
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Camera Scanner
              </h2>
              <p className="text-gray-600 mb-6">
                Position your menu in front of the camera and click "Capture & Scan" when ready.
              </p>
            </div>

            {/* Camera Controls */}
            <div className="flex justify-center gap-4 mb-6">
              {!isStreaming ? (
                <button
                  onClick={startCamera}
                  className="bg-[#A64B29] hover:bg-[#8B3E24] text-white px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#A64B29] focus:ring-offset-2 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Stop Camera
                </button>
              )}
            </div>

            {/* Video Display */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-6">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-96 object-cover"
                playsInline
                muted
              />
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <p className="text-lg">Camera not active</p>
                    <p className="text-sm text-gray-400">Click "Start Camera" to begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Capture Button */}
            <div className="text-center">
              <button
                onClick={captureAndScan}
                disabled={!isStreaming || isScanning}
                className={`px-8 py-4 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2 mx-auto ${
                  isStreaming && !isScanning
                    ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isScanning ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Scanning...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Capture & Scan
                  </>
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Debug Info - Show extracted text */}
            {isScanning && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="text-blue-800 font-medium mb-2">Processing Image...</h4>
                <p className="text-blue-700 text-sm">
                  Extracting text from your image and analyzing for allergens...
                </p>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}

export default CameraScanningPage
