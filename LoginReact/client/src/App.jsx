// import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignupForm from './Singup'
import LoginForm from "./Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {


  return (
    <BrowserRouter>
      <h1>Hello! I'm Harsha change the url dir to get into register/login</h1>
      <Routes>
        <Route path='/register' element={<SignupForm />}> </Route>
        <Route path='/login' element={<LoginForm />}> </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
