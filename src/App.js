import React, { useEffect } from 'react';
import googleapis from 'googleapis';

const YOUR_CLIENT_ID = 'YOUR_CLIENT_ID';
const YOUR_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const YOUR_REDIRECT_URL = 'YOUR_REDIRECT_URL';

function App() {
  // useEffect(() => {
  //   const { google } = require('googleapis');
  //   const OAuth2 = google.auth.OAuth2;
  //   const oauth2Client = new OAuth2(
  //       YOUR_CLIENT_ID,
  //       YOUR_CLIENT_SECRET,
  //       YOUR_REDIRECT_URL
  //   );
  //
  //   const getAccessToken = async (code) => {
  //     const { tokens } = await oauth2Client.getToken(code);
  //     const accessToken = tokens.access_token;
  //     return accessToken;
  //   };
  //
  //   const listDriveFiles = async () => {
  //     try {
  //       const accessToken = await getAccessToken('YOUR_CODE_FROM_2FA');
  //       const drive = google.drive({ version: 'v3', auth: oauth2Client });
  //
  //       const res = await drive.files.list({
  //         pageSize: 10,
  //         fields: 'nextPageToken, files(id, name)',
  //       });
  //
  //       const files = res.data.files;
  //       if (files.length) {
  //         console.log('Files:');
  //         files.map((file) => {
  //           console.log(`${file.name} (${file.id})`);
  //         });
  //       } else {
  //         console.log('No files found.');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //
  //   listDriveFiles();
  // }, []);
  // const handleSignInClick = () => {
  //   const auth2 = window.gapi.auth2.getAuthInstance();
  //   auth2.signIn().then((googleUser) => {
  //     const id_token = googleUser.getAuthResponse().id_token;
  //     // Здесь можно использовать id_token для аутентификации с вашим сервером или в Google API.
  //   });
  // };
  return (
      <div className="App">
        {/*<button onClick={handleSignInClick}>Войти через Google</button>*/}
      </div>
  );
}

export default App;
