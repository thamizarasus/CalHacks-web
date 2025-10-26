import React from 'react'

const AllergySelector = ({ allergens, selectedAllergens, onSelectionChange }) => {
  const handleAllergenToggle = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      onSelectionChange(selectedAllergens.filter(a => a !== allergen))
    } else {
      onSelectionChange([...selectedAllergens, allergen])
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
      
      <div className="flex flex-wrap gap-3">
        {allergens.map((allergen) => (
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
        ))}
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
