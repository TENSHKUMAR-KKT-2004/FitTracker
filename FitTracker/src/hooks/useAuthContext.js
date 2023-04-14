import {AuthConetxt} from '../context/authContext'
import {useCOntext, useContext} from 'react'

export const useAuthContext = ()=>{
    const context = useContext(AuthConetxt)
    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
    return context
}
