import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
import { AppProvider } from './components/Ui_generator/Sidebar/Context';
import { useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
function App() {
const location = useLocation();
const pathName=location.pathname;
  return (
    <>
    {pathName==='/login'||pathName==='/signup'?null:<> <Topbar/></>}
    <AppProvider>
      <Outlet/>
      </AppProvider>
    </>
  )
}

export default App
