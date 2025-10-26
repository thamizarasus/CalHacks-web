import React from 'react'
import TopNavTabs from './TopNavTabs'

function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodAllerGuard
          </h1>
          <div className="mt-6 mb-10">
            <TopNavTabs active="results" />
          </div>
          <p className="text-lg text-gray-600">
            View your scan results
          </p>
        </header>

        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-gray-500">Results page coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
