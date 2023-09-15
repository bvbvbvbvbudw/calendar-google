import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

    useEffect(() => {

        axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBmkMhO2LrrXjFcyMp-ROWXzGeBA_ycuw0')
            .then(response => console.log(response))
            .catch(error => console.log(error))
    },[])

    return (
        <div className="App">
            <h1>События календаря</h1>
            <ul>

            </ul>
        </div>
    );
}

export default App;
