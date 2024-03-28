// import { useState } from 'react'
import "./App.css";
import Home from "./pages/Home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
function App() {
  // const [count, setCount] = useState(0)
  const {authUser} = useAuthContext();
  return (
    <div className="p-4 h-screen w-screen flex items-center justify-center  overflow-hidden">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={authUser ?<Home /> :<Navigate to='/login'/>} />
        <Route path="/login" element={authUser? <Navigate to='/'/> :<Login />} />
        <Route path="/signup" element={authUser? <Navigate to='/'/> : <Signup />} />
      </Routes>
    </div>
  );
}

export default App;
