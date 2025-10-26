/**
 * Simple scanner for camera mode
 * Returns only detected allergens without full menu mock data
 */
export function scanForAllergens(text, selectedAllergens) {
  const detected = [];

  selectedAllergens.forEach(allergen => {
    if (text.toLowerCase().includes(allergen.toLowerCase())) {
      detected.push({ 
        type: allergen,
        description: `Contains ${allergen}` 
      });
    }
  });

  return {
    dangerousItems: detected,
    safeItems: [],
    menuItems: []
  };
}

