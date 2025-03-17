import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PizzaPlaceDetail from './pages/PizzaPlaceDetail';
import AddPizzaPlace from './pages/AddPizzaPlace';
import AddReview from './pages/AddReview';
import AddEntity from './pages/AddEntity'; // Import the AddEntity component
// import Profile from './pages/Profile';
import ErrorBoundary from './components/ErrorBoundary';
// Import context
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <Header user={user} onLogout={logout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/pizza-place/:id" element={<PizzaPlaceDetail user={user} />} />
          <Route path="/add-pizza-place" element={user ? <AddPizzaPlace user={user} /> : <Navigate to="/login" />} />
          <Route path="/add-review/:pizzaPlaceId" element={user ? <AddReview user={user} /> : <Navigate to="/login" />} />
          <Route path="/add-entity" element={user ? <AddEntity /> : <Navigate to="/login" />} /> {/* New route for AddEntity */}
          {/* <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;