import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AuthApi from './utils/AuthApi';
import DashBoard from './components/DashBoard';
// import Routes from './routes/Routes';

// import Routes from './routes/Routes';
function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

    </div>
  );
}

export default App;
