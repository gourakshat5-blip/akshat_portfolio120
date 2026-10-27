import { createContext, useContext } from 'react'

// Lets any room open the Simple View, resume preview or certificate viewer.
export const OverlayContext = createContext({ open: () => {}, close: () => {} })

export const useOverlay = () => useContext(OverlayContext)
