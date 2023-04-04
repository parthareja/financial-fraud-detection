import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthApi from './utils/AuthApi';

// import Routes from './routes/Routes';
function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" Component={<SignUp />} />
        </Routes>
      </BrowserRouter> */}
      <SignIn/>
    </div>
  );
}

export default App;
