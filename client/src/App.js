
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path = '/' element={<Home></Home>} />
        <Route path ="/login" element ={<Login></Login>} />
        <Route path ="/register" element ={<Register></Register>} />
      </Routes>
    </div>
  );
}

export default App;
