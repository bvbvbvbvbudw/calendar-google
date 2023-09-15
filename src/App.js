import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

function App() {
    const [events, setEvents] = useState([]);
    const [apiKey, setApiKey] = useState(''); // Добавляем состояние для apiKey

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
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: 'AIzaSyBr1i2szcRo1NQ6ETowmlGueloqq35eH3M', // Используем apiKey
                clientId: '524450418250-1vg717h32a9dfob8a4eeq4a7lsbonihm.apps.googleusercontent.com',
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: 'https://www.googleapis.com/auth/calendar.readonly',
            }).then(() => {
                gapi.auth2.getAuthInstance().signIn().then(loadEvents);
            });
        });
    }, [apiKey]); // Добавляем apiKey в зависимости, чтобы перезагружать gapi.client.init при изменении

    return (
        <div className="App">
            <GoogleOAuthProvider clientId={'524450418250-1vg717h32a9dfob8a4eeq4a7lsbonihm.apps.googleusercontent.com'}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        setApiKey(credentialResponse.credential); // Устанавливаем apiKey
                    }}
                    onError={() => {
                        console.log('login error');
                    }}
                />
            </GoogleOAuthProvider>

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
