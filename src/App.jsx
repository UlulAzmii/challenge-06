import './App.css';
import Home from './pages/Home';
import DetailMovie from './components/DetailMovie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
      >
        <div className="App">
          <header className="App-header">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/DetailMovie/:Id" element={<DetailMovie />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </header>
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
