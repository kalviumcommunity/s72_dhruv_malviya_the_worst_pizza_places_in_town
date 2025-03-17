import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PizzaPlaceDetails from './pages/PizzaPlaceDetails';
import SubmitPizzaPlace from './pages/SubmitPizzaPlace';
import theme from './theme';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pizza-place/:id" element={<PizzaPlaceDetails />} />
            <Route path="/submit" element={<SubmitPizzaPlace />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App; 