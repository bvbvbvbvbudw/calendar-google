import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

function App() {
    const [events, setEvents] = useState([]);
    const [api, setApi] = useState()
    const loadEvents = () => {
        gapi.client.calendar.events.list({
            calendarId: 'primary', // 'primary' обычно ссылается на календарь текущего пользователя
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        }).then(response => {
            console.log(response)
            const events = response.result.items;
            setEvents(events);
        });
    };

    useEffect(() => {
        // Загружаем библиотеку gapi после аутентификации
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: api,
                clientId: '524450418250-1vg717h32a9dfob8a4eeq4a7lsbonihm.apps.googleusercontent.com',
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: 'https://www.googleapis.com/auth/calendar.readonly',
            }).then(() => {
                // Авторизуем пользователя и при успешной авторизации загружаем события
                gapi.auth2.getAuthInstance().signIn().then(loadEvents);
            });
        });
    }, []);

    return (
        <div className="App">
            <GoogleOAuthProvider clientId={'524450418250-1vg717h32a9dfob8a4eeq4a7lsbonihm.apps.googleusercontent.com'}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        setApi(credentialResponse.credential)
                        loadEvents(); // Загружаем события при успешной аутентификации
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
