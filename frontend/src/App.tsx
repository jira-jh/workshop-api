import './App.css'
import { useEffect, useState, lazy } from 'react'
import { callGet } from './services/axios.service'
import Navbar from './components/navbar';
import Card from './components/card';
import Container from '@mui/material/Container';
import { Grid, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import { Routes, Route } from 'react-router';

const AddProduct = lazy(() => import('./pages/add'))
const ProductList = lazy(() => import('./pages/list'))
function App() {
  const router = () => {
    return (
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    )
  }

  return (
    <div style={{ height: '100vh' }}>
      <Navbar />
      {router()}
    </div>
  )
}

export default App
