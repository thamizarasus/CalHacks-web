import React, { useState } from 'react'

const AllergySelector = ({ allergens, selectedAllergens, onSelectionChange }) => {
  const [customInput, setCustomInput] = useState("")
  
  console.log('AllergySelector received allergens:', allergens)

  const handleAllergenToggle = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      onSelectionChange(selectedAllergens.filter(a => a !== allergen))
    } else {
      onSelectionChange([...selectedAllergens, allergen])
    }
  }

  const handleAddCustom = () => {
    if (customInput.trim() && !selectedAllergens.includes(customInput.toLowerCase())) {
      const capitalized = customInput.charAt(0).toUpperCase() + customInput.slice(1).toLowerCase()
      onSelectionChange([...selectedAllergens, capitalized.toLowerCase()])
      setCustomInput("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCustom()
    }
  }

  // Map allergens to their corresponding emojis
  const getEmoji = (allergen) => {
    const emojiMap = {
      'nuts': '🥜',
      'peanuts': '🥜',
      'dairy': '🧀',
      'eggs': '🥚',
      'soy': '🌱',
      'wheat': '🌾',
      'fish': '🐟',
      'shellfish': '🦐',
      'sesame': '✴️',
      'sulfites': '⚗️'
    }
    return emojiMap[allergen] || '⚠️'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Select Your Allergies
      </h2>
      <p className="text-gray-600 mb-6">
        Choose the allergens you need to avoid. We'll check your ingredients against these.
      </p>
      
      <div className="space-y-6">
        {/* Label */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-3">
            Select Your Allergies
          </label>
          
          <div className="flex flex-wrap gap-3">
            {allergens && allergens.length > 0 ? allergens.map((allergen) => (
              <button
                key={allergen}
                onClick={() => handleAllergenToggle(allergen)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                  selectedAllergens.includes(allergen)
                    ? 'bg-[#A64B29] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{getEmoji(allergen)}</span>
                <span>{allergen.charAt(0).toUpperCase() + allergen.slice(1)}</span>
              </button>
            )) : (
              <div className="text-gray-500 text-sm">Loading allergens...</div>
            )}
          </div>
        </div>

        {/* Custom allergen input */}
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Add Custom Allergen
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a custom allergen…"
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A64B29] focus:border-transparent"
            />
            <button
              onClick={handleAddCustom}
              className="rounded-full bg-[#A64B29] text-white px-6 py-2 text-sm font-medium hover:bg-[#8B3E24] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A64B29] focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {selectedAllergens.length > 0 && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-700">
            <strong>Selected:</strong> {selectedAllergens.join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}

export default AllergySelector
