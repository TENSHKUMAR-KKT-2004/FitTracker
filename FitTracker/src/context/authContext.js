import React, { createContext, useReducer } from 'react';

export const AuthConetxt = createContext()

export const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user : null}
        default:
            return state
    }
}

export const AuthConetxtProvider = ({Children})=>{
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    })
    return (
        <AuthConetxt.Provider value={{...state,dispatch}}>
            {Children}
        </AuthConetxt.Provider>
    )
}