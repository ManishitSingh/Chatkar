// import { useState } from 'react'

import "./App.css";
import Home from "./pages/Home/Home";
// import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="p-4 h-screen w-screen flex items-center justify-center  overflow-hidden">
      {/* <Login /> */}
      {/* <Signup /> */}
      <Home />
    </div>
  );
}

export default App;
