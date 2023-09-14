import React from 'react';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'

function App() {



    return (
        <div className="App">
            <GoogleOAuthProvider clientId={'524450418250-1emdb2dnk2v95t5a8s5ltefjrhop85i8.apps.googleusercontent.com'}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse)
                    }}
                    onError={() => {
                        console.log('login error')
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
}

export default App;
