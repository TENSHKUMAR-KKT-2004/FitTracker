import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'

import moment from 'moment'

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    if(!user){
        return
    }

    const handleClick = async ()=>{
        const response = await fetch('api/workouts/'+workout._id,{
            method:'DELETE',
            headers:{
                'Authorization' : `Bearer ${user.token}` 
              }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload: json})
        }
    }
    return ( 
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (KG): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{moment(new Date(workout.createdAt)).fromNow()}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
    </div> );
}
 
export default WorkoutDetails;