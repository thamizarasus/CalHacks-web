import { createContext, useContext, useState } from "react"

const ScanContext = createContext()

export function ScanProvider({ children }) {
  const [selectedAllergies, setSelectedAllergies] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [scanResults, setScanResults] = useState(null)

  return (
    <ScanContext.Provider
      value={{
        selectedAllergies,
        setSelectedAllergies,
        selectedImage,
        setSelectedImage,
        scanResults,
        setScanResults,
      }}
    >
      {children}
    </ScanContext.Provider>
  )
}

export function useScan() {
  return useContext(ScanContext)
}
