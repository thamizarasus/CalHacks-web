import React from 'react'

const SelectedAllergies = ({ allergies }) => {
  if (!allergies || allergies.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl bg-[#FFF7EC] p-4 mt-4">
      <p className="text-[#A64B29] font-medium">
        Selected: {allergies.join(', ')}
      </p>
    </div>
  )
}

export default SelectedAllergies
