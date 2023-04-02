import React,{useEffect,useState} from 'react'

// components
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
  const [workouts,setWorkouts] = useState(null)
  useEffect(()=>{
    const fetchWorkouts = async()=>{
      const responce = await fetch('/api/workouts') 
      const json = await responce.json()

      if(responce.ok){
        setWorkouts(json)
      }
    }
    fetchWorkouts()
  },[])
  return (
    <div className="home">
      <h2>Home</h2>
      <div className="workouts">
        {workouts && workouts.map((workout)=>(
          <WorkoutDetails ket={workout._id} workout={workout}/>
          ))}
      </div>
    </div>
  )
}

export default Home