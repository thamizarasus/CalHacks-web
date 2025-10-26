import React from 'react'

const AllergySelector = ({ allergens, selectedAllergens, onSelectionChange }) => {
  const handleAllergenToggle = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      onSelectionChange(selectedAllergens.filter(a => a !== allergen))
    } else {
      onSelectionChange([...selectedAllergens, allergen])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Select Your Allergens
      </h2>
      <p className="text-gray-600 mb-6">
        Choose the allergens you need to avoid. We'll check your ingredients against these.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {allergens.map((allergen) => (
          <button
            key={allergen}
            onClick={() => handleAllergenToggle(allergen)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedAllergens.includes(allergen)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
          </button>
        ))}
      </div>

      {selectedAllergens.length > 0 && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            <strong>Selected:</strong> {selectedAllergens.join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}

export default AllergySelector
