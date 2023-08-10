
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Home></Home>} />
        <Route path ="/login" element ={<Login></Login>} />
        <Route path ="/register" element ={<Register></Register>} />
      </Routes>
    </div>
  );
}

export default App;
