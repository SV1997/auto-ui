import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
import { AppProvider } from './components/Ui_generator/Sidebar/Context';
function App() {

  return (
    <>
    <AppProvider>
      <Outlet/>
      </AppProvider>
    </>
  )
}

export default App
