import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const UploadCard = ({ onFileSelect, onStartScan, hasSelectedAllergens }) => {
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFileSelectButton = () => {
    if (hasSelectedAllergens) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (onFileSelect) {
        onFileSelect(file)
      }
      if (onStartScan) {
        onStartScan()
      }
    }
  }

  const handleCameraScan = () => {
    if (hasSelectedAllergens) {
      navigate('/camera-scan')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Scan Your Food
      </h2>
      <p className="text-gray-600 mb-8">
        Upload a photo of your menu or ingredients, or use your camera to scan them directly.
      </p>

      <div className="space-y-4">
        {/* Upload Menu Photo Button */}
        <button
          onClick={handleFileSelectButton}
          disabled={!hasSelectedAllergens}
          className={`w-full py-4 px-6 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center space-x-3 ${
            hasSelectedAllergens
              ? 'bg-[#A64B29] hover:bg-[#8B3E24] text-white focus:ring-[#A64B29]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span>Upload Menu Photo</span>
        </button>

        {/* Scan with Camera Button */}
        <button
          onClick={handleCameraScan}
          disabled={!hasSelectedAllergens}
          className={`w-full py-4 px-6 rounded-xl font-medium border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center space-x-3 ${
            hasSelectedAllergens
              ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 focus:ring-gray-300'
              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Scan with Camera</span>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default UploadCard
