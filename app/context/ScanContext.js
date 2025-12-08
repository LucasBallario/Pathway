import { useContext, useState } from "react";
import { createContext } from "react";

const ScanContext = createContext()

const ScanProvider = ({children}) => {
    const [scanResults, setScanResults] = useState()
    return <ScanContext.Provider value={{ scanResults, setScanResults }}>
        {children}
    </ScanContext.Provider>
}

const useScan = () => {
   return useContext(ScanContext)
}

export { ScanProvider, useScan }
