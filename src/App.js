import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

function App() {
    const [events, setEvents] = useState([]);

    const loadEvents = () => {
        gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        }).then(response => {
            const events = response.result.items;
            setEvents(events);
        });
    };

    useEffect(() => {
        const test = () => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    apiKey: 'AIzaSyBmkMhO2LrrXjFcyMp-ROWXzGeBA_ycuw0', // Используем apiKey
                    clientId: '925413843938-hsl81da43sc7c25v0mrqqh4ic4v97mg8.apps.googleusercontent.com',
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                    scope: 'https://www.googleapis.com/auth/calendar.readonly',
                }).then(() => {
                    gapi.auth2.getAuthInstance().signIn().then(loadEvents);
                });
            });
        }
        test();
    }, []); // Добавляем apiKey в зависимости, чтобы перезагружать gapi.client.init при изменении

    return (
        <div className="App">
            <GoogleOAuthProvider clientId={'925413843938-hsl81da43sc7c25v0mrqqh4ic4v97mg8.apps.googleusercontent.com'}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('login error');
                    }}
                />
            </GoogleOAuthProvider>
            <button onClick={loadEvents}>load</button>
            <button onClick={test}>test</button>
            <h2>События:</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>{event.summary}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
