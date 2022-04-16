import './App.css';
import { BrowserRouter as Router, Route, Routes,   Navigate
} from "react-router-dom";
import Login from "../src/Pages/Loing";
import Register from "../src/Pages/Register"
import EmailValidation from './Pages/EmailValidation';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <>
    <div style={{height: '100vh'}} className='d-flex'>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/emailValidation' element={<EmailValidation/>}/>
          <Route path='/homepage' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
