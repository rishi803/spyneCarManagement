import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProductListPage from "./components/ProductListPage";
import ProductCreationPage from "./components/ProductCreationPage";
import "./App.css";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const alreadyAuthenticated = localStorage.getItem("isAuthenticated");

    if (alreadyAuthenticated) return alreadyAuthenticated;
  });


  const [email, setEmail] = useState(()=>{
    if(isAuthenticated){
        return JSON.parse(localStorage.getItem('isAuthenticated'));
    }
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const handleLogin = (email) => {
    setEmail(email);
  }

  return (
   
    <Router>
       console.log(email,"rrr")
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProductListPage
                handleLogout={handleLogout}
                email={email}
        
              />
            ) : (
              <>
                {console.log(isAuthenticated)}
                <Navigate to="/login" />
              </>
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              setEmail={setEmail}
              setIsAuthenticated={setIsAuthenticated}
              email={email}
              updateEmail={handleLogin}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/create" element={<ProductCreationPage />} />
  
      </Routes>
    </Router>
  );
}

export default App;
