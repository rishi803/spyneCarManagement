import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';

const LoginPage = ({  setEmail,
  setIsAuthenticated,
  email,
  updateEmail}) => {
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
      setIsAuthenticated(true);
      updateEmail(email);
      localStorage.setItem("isAuthenticated",JSON.stringify(email));
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };



  return (
    <div className="signupLogin-container">
      <form className="signupLogin-box" onSubmit={handleLogin}>
        <h2 className="signupLogin-title">Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="signupLogin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="signupLogin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="signupLogin-button">
          Login
        </button>
        <p className="signupLogin-link">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
