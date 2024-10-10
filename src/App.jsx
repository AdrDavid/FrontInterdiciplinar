import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Views/Home'
// import NavBar from './components/partials/NavBar'
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  
  // const location = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);


  return <Outlet />;
}

export default App;
