import { createContext, useContext } from 'react'

/** The active build step of the slide being rendered. */
export const StepContext = createContext(0)
export const useStep = () => useContext(StepContext)
