import Register from './components/Register';
import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom"
import './App.css';
import Login from './components/Login';
import Todos from "./components/Todos"



const App = ()=> {

  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Navigate to = "/register"/>} />
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/login" element ={<Login/>} />
        <Route  path = "/todos" element= {<Todos/>} />
      </Routes>
    </BrowserRouter>
  )
}



export default App;
