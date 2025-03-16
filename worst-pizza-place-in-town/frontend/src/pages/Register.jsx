import React, { useState } from 'react';
import '../styles/Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration submission
    console.log({ email, password, confirmPassword, agreeTerms });
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-form">
          <h1>Register</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>

            <button type="submit" className="login-button">Register</button>
            
            <div className="register-link">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;