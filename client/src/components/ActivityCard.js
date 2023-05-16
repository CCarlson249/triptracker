import {useState, useEffect} from 'react';


function ActivityCard({tripEvent}){
    return (
        <div className='ActivityCard'>
            <h3>{tripEvent.name}</h3>
            <h3>{tripEvent.date}</h3>
            <h3>{tripEvent.time}</h3>
            <h3>{tripEvent.description}</h3>
            <button>Remove Activity</button>
        </div>
    )
}

export default ActivityCard;