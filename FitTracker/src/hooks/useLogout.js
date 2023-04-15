import { useAuthContext } from "./useAuthContext"
import {useWorkoutsContext} from './useWorkoutContext'
export const useLogout = ()=>{
    const { dispatch } = useAuthContext()
    const { dispatch : workoutDispatch } = useWorkoutsContext()

    const logout = ()=>{
        // remove the user from local storage
        localStorage.removeItem('user')

        // update the auth context
        dispatch({type:'LOGOUT'})
        // for flush out the global state
        workoutDispatch({type:'SET_WORKOUTS',payload:null})
    }
    return { logout }
}