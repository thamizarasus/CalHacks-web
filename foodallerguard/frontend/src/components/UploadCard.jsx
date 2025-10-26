import React from 'react'

const UploadCard = ({ ingredients, onIngredientsChange, onCheckIngredients, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Enter Ingredients
      </h2>
      <p className="text-gray-600 mb-6">
        Enter the ingredients you want to check, one per line.
      </p>

      <div className="space-y-4">
        <textarea
          value={ingredients}
          onChange={(e) => onIngredientsChange(e.target.value)}
          placeholder="Enter ingredients here, one per line...&#10;Example:&#10;milk chocolate&#10;almond flour&#10;vanilla extract"
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />

        <button
          onClick={onCheckIngredients}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking ingredients...
            </div>
          ) : (
            'Check for Allergens'
          )}
        </button>
      </div>
    </div>
  )
}

export default UploadCard
