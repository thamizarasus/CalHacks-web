import React from 'react'

const Results = ({ results }) => {
  const { safe, found_allergens } = results

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Allergen Check Results
      </h2>

      {safe ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100 mb-4">
            <svg className="h-6 w-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-success-800 mb-2">
            Safe to Consume!
          </h3>
          <p className="text-success-600">
            No allergens were detected in the ingredients you provided.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-danger-50 rounded-lg">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-danger-800">
                Allergens Detected
              </h3>
              <p className="text-sm text-danger-700 mt-1">
                The following allergens were found in your ingredients:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {found_allergens.map((allergen, index) => (
              <div key={index} className="p-4 border border-danger-200 rounded-lg bg-danger-25">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-danger-400 rounded-full mt-2"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-danger-800">
                      {allergen.allergen.charAt(0).toUpperCase() + allergen.allergen.slice(1)}
                    </h4>
                    <p className="text-sm text-danger-700 mt-1">
                      Found in: <span className="font-medium">{allergen.ingredient}</span>
                    </p>
                    <p className="text-xs text-danger-600 mt-1">
                      Matched term: {allergen.matched_term}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important Notice
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This tool is for informational purposes only. Always read food labels carefully and consult with healthcare professionals if you have severe allergies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
