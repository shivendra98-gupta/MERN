import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import {Route,Routes,Navigate} from"react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from './Components/Registration';
import ErrorPage from './Components/ErrorPage';
import Logout from './Components/Logout';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <>
    <Navbar/>
     <Routes>
        <Route exact path="/" element={sessionStorage.getItem('token')!==undefined || sessionStorage.getItem('token') !==null ? <Home/> : <Navigate replace to={"/login"}/>} />

          <Route path="/about"element={<About/>} /> 
          <Route path="/contact"element={<Contact/>} /> 
          <Route path="/login"  element={<Login/>} />
          <Route path="/register"element={<Signup/>} />
          <Route path="/logout"element={<Logout/>} />
          <Route path="" element={<ErrorPage/>} />             {/*----AESTRCK IS IMPORTANT JBH PATH MEH KUCH AUR LIKH DEH AGAR------*/}
      </Routes>
         </>
  );
}

export default App