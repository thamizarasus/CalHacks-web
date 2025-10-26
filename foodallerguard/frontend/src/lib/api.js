const API_BASE_URL = '/api'

export const allergenIcon = {
  fish: "🐟",
  nuts: "🥜",
  peanuts: "🥜",
  dairy: "🧀",
  eggs: "🥚",
  soy: "🌱",
  wheat: "🌾",
  shellfish: "🦐",
  sesame: "✨",
  sulfites: "🚫"
}

export const getAllergens = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/allergens`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching allergens:', error)
    throw error
  }
}

export const checkIngredients = async (allergens, ingredients) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allergens,
        ingredients,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error checking ingredients:', error)
    throw error
  }
}

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error checking API health:', error)
    throw error
  }
}

export async function scanMenu(allergens) {
  try {
    const response = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allergens }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json();
  } catch (error) {
    console.error('Error scanning menu:', error)
    throw error
  }
}

export async function clearScanHistory() {
  try {
    const response = await fetch("/api/clear-scans", { method: "DELETE" })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error clearing scan history:', error)
    throw error
  }
}

export async function getRecentScans() {
  try {
    const response = await fetch("/api/scans")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error getting recent scans:', error)
    throw error
  }
}

export async function saveScan(scanData) {
  try {
    const response = await fetch("/api/save-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scanData)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error saving scan:', error)
    throw error
  }
}
