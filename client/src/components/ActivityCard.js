import {useState, useEffect} from 'react';


function ActivityCard({tripEvent, removeActivity}){
    const handleRemoveActivity = () => {
        removeActivity(tripEvent.id);
      };
    

    return (
        <div className='ActivityCard'>
            <h3>{tripEvent.name}</h3>
            <h3>{tripEvent.date}</h3>
            <h3>{tripEvent.time}</h3>
            <h3>{tripEvent.description}</h3>
            <button onClick={handleRemoveActivity}>Remove Activity</button>
        </div>
    )
}

export default ActivityCard;