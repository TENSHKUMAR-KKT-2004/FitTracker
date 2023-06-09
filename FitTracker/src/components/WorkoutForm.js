import React,{ useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const [title,setTitle] = useState("")
    const [load,setLoad] = useState("")
    const [reps,setReps] = useState("")
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])
    const [isPending,setPending] = useState(false)

    const handleSubmit =async (e) => {
        e.preventDefault()
        setPending(true)
        if(!user){
            setError('You must be Logged in')
            return
        }

        const workout = {title,load,reps}
        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if(!response.ok){
            setEmptyFields(json.emptyFields)
            setError(json.error)
            setPending(false)
        }

        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            setError(null)
            dispatch({type:'CREATE_WORKOUT',payload:json})
            setPending(false)
        }
    }
    return ( 
    <form onSubmit={handleSubmit} className="create">
        <h3>Add the new Workout</h3>
        <label>Exercise Title:</label>
        <input 
        type="text" 
        onChange={(e)=>setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label>Load (in KG):</label>
        <input 
        type="number" 
        onChange={(e)=>setLoad(e.target.value)} 
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
        />
        <label>Reps:</label>
        <input 
        type="number" 
        onChange={(e)=>setReps(e.target.value)} 
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
        />
        {isPending ? <button disabled>Loading...</button> : <button>Add Workout</button>}
        {error && <div className="error">{error}</div> }
    </form>
 );
}
 
export default WorkoutForm;