import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { gapi } from 'gapi-script';

function App() {
    const [events, setEvents] = useState([]);

    var CLIENT_ID = "925413843938-hsl81da43sc7c25v0mrqqh4ic4v97mg8.apps.googleusercontent.com";
    var API_KEY = "AIzaSyBmkMhO2LrrXjFcyMp-ROWXzGeBA_ycuw0";
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client');

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });

            gapi.client.load('calendar', 'v3', () => console.log('bam!'));

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    // Получаем события, к которым вы присоединены
                    gapi.client.calendar.events.list({
                        'timeMin': (new Date()).toISOString(),
                        'showDeleted': false,
                        'singleEvents': true,
                        'maxResults': 10,
                        'orderBy': 'startTime',
                        'q': 'attendees:YOUR_EMAIL@gmail.com' // Замените YOUR_EMAIL на ваш адрес электронной почты
                    }).then(response => {
                        const events = response.result.items;
                        setEvents(events);
                    }, error => {
                        console.error('Error fetching events:', error);
                    });
                });
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Click to get events from Google Calendar</p>
                <button style={{width: 100, height: 50}} onClick={handleClick}>Get Events</button>
                <div>
                    {events.map((event, index) => (
                        <div key={index}>
                            <h3>{event.summary}</h3>
                            <p>{event.start.dateTime}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
