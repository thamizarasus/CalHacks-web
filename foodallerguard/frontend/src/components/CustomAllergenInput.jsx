import React, { useState } from 'react'

const CustomAllergenInput = ({ selectedAllergies, setSelectedAllergies }) => {
  const [customInput, setCustomInput] = useState("")

  const handleAddCustom = () => {
    if (customInput.trim() && !selectedAllergies.includes(customInput.toLowerCase())) {
      const capitalized = customInput.charAt(0).toUpperCase() + customInput.slice(1).toLowerCase()
      setSelectedAllergies([...selectedAllergies, capitalized.toLowerCase()])
      setCustomInput("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCustom()
    }
  }

  return (
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
  )
}

export default CustomAllergenInput
