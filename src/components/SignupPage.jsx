import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import "./Signup.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "Name should contain only letters";
      } else if (value.length < 3) {
        error = "Name must be at least 3 characters long";
      }
    } else if (name === "password") {
      if (value.length < 4) {
        error = "Password must be at least 4 characters long";
      }
    }
    return error;
  };

  const handleLiveError = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Validate field and update specific error message
    const error = validateField(name, value);
    if (error) {
      newErrors[name] = error;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);

    // Update input values
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Final validation before submission
    const nameError = validateField("name", name);
    const passwordError = validateField("password", password);

    if (nameError || passwordError) {
      setErrors({
        ...errors,
        name: nameError,
        password: passwordError,
      });
      return;
    }

    const user = { name, email, password };
    localStorage.setItem(`${email}`, JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="signupLogin-container">
      <form className="signupLogin-box" onSubmit={handleSignup}>
        <h2 className="signupLogin-title">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="signupLogin-input"
          value={name}
          onChange={handleLiveError}
          required
           autoComplete="off"
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="signupLogin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
           autoComplete="off"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="signupLogin-input"
          value={password}
          onChange={handleLiveError}
          required
           autoComplete="off"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" className="signupLogin-button">
          Signup
        </button>
        <p className="signupLogin-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
