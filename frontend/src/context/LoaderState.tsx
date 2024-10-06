import React, { createContext, useState } from 'react'

const LoaderContext = createContext()
const LoaderState = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  console.log("loading : ", isLoading)
  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}

    </LoaderContext.Provider>
  )
}

export { LoaderState, LoaderContext }
