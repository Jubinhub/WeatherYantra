// Data layer
// We need this to tract the basket
import React, { createContext, useContext, useReducer } from 'react'

//THIS IS THE DATA LAYER
const StateContext = createContext();

// BUILD PROVIDER
export function StateProvider({ reducer, initialState, children }) {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

// THIS IS HOW WE USE IT INSIDE OUR COMPONENT
export const useStateValue = () => useContext(StateContext);