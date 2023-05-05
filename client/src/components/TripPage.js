import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';





function TripPage(){
    const [trips, setTrips] = useState([])    
    let params = useParams();
    
     useEffect(() =>{
        fetch(`/trips/${params.id}`)
        .then(res => res.json())
        .then(data => {
        setTrips(data)
    
console.log(data)})
        
    }, [params.id])

    console.log(trips)
return (
    <div>
        <h1>{trips.name}</h1>
        </div>
)
}

export default TripPage;