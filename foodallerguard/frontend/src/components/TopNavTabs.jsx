import React from 'react'
import { Link } from 'react-router-dom'

const TopNavTabs = ({ active = "home" }) => {
  const getTabClassName = (tab) => {
    const isActive = active === tab
    return `px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center space-x-2 ${
      isActive 
        ? 'bg-[#A64B29] text-white font-semibold' 
        : 'text-gray-600 hover:text-gray-900'
    }`
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 inline-flex gap-6">
        <Link to="/" className={getTabClassName("home")}>
          <span>🏠</span>
          <span>Home</span>
        </Link>
        
        <Link to="/scanning" className={getTabClassName("scanning")}>
          <span>🔄</span>
          <span>Scanning</span>
        </Link>
        
        <Link to="/results" className={getTabClassName("results")}>
          <span>📄</span>
          <span>Results</span>
        </Link>
      </div>
    </div>
  )
}

export default TopNavTabs
