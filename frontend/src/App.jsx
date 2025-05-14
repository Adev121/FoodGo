import { useState } from 'react'
import Home from './pages/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './pages/Login'
import Signup from './pages/Signup'
import Contacts from './pages/Contacts';
import About from './pages/About';
import CartPage from './pages/CartPage';
import Order from './pages/Order';
import { Toaster } from 'react-hot-toast';
import AdminPanel from './pages/AdminPanel';




function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cartpage' element={<CartPage/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  )
}

export default App
