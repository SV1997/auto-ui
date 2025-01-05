import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import Login from './components/Login.tsx'
import SignUp from './components/Signup.tsx'
import Workshops from './components/workshops.tsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import store from './store/store.ts'
import Dashboard from './components/Dashboard.tsx'
import AuthLayout from './components/AuthLayout.tsx'
const router = createBrowserRouter([{
  path:'/',
  element: <App/>,
  children: [
    {
      path:'/',
      element: <App/>
    },
    {
      path:'/login',
      element: <Login/>
    },
    {
      path:'/signup',
      element: <SignUp/>
    },
    {
      path:'/dashboard',
      element: <AuthLayout><Dashboard/></AuthLayout>
    },
    {
      path:'/workshops',
      element: <AuthLayout><Workshops/></AuthLayout>
    }
  ]
}])

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>  
)
