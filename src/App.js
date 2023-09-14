import logo from './logo.svg';
import './App.css';
import {GoogleLogin} from 'react-google-login';

function App() {
  return (
    <div className="App">
        <GoogleLogin clientId={'925413843938-hsl81da43sc7c25v0mrqqh4ic4v97mg8.apps.googleusercontent.com'}/>
    </div>
  );
}

export default App;
