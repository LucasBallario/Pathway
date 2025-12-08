import { useContext, useState } from "react";
import { createContext } from "vm";

const ScanContext = createContext()

const ScanProvider = ({children}) => {
    const [scanResults, setScanResults] = useState()
    return <ScanContext.Provider value={{ scanResults, setScanResults }}>
        {children}
    </ScanContext.Provider>
}

const useScan = () => {
    useContext(ScanContext)
}

export { ScanProvider, useScan }
