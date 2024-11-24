import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Google Sign-In successful!");
      setError("");
    } catch (error) {
      setError("Error signing in with Google. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleEmailSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage(`Sign up successful! Welcome ${email}!`);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Error during sign-up. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage(`Login successful! Welcome back, ${email}!`);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Error during login. Please check your credentials.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="left-panel-branding">
          <span className="left-panel-logo">⌘</span>
          <h1 className="left-panel-title">Course Forge</h1>
        </div>
        
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h2 className="right-panel-title">Create an account</h2>
        <p className="right-panel-subtitle">
          Enter your email below to create your account
        </p>
        {successMessage && (
          <p className="right-panel-success-message">{successMessage}</p>
        )}
        {error && <p className="right-panel-error-message">{error}</p>}
        <input
          className="right-panel-input"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="right-panel-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="right-panel-button" onClick={handleEmailSignUp}>
          Sign Up
        </button>
        <div className="right-panel-divider">OR CONTINUE WITH</div>
        <button className="right-panel-github-button" onClick={handleGoogleLogin}>
          <span><FcGoogle />  Google</span>
        </button>
        <p className="right-panel-terms">
          By clicking continue, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
