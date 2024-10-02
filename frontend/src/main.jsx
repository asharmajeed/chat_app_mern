import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import store from './store/store.js'
import { SocketContextProvider } from "./context/SocketContext.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: "",
        element: (
          <AuthLayout authentication>
            <Home/>
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp/>
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <SocketContextProvider>
          <RouterProvider router={router}/>
				</SocketContextProvider>
    </Provider>
  </React.StrictMode>,
)
