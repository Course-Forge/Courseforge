import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "./NewLogin.css";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleEmailSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, "defaultpassword");
      alert("Sign up successful!");
    } catch (error) {
      alert("Error signing up. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-In successful!");
    } catch (error) {
      alert("Error signing in with Google. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Side */}
      <div className="left-panel">
        <div className="branding">
          <span className="logo">⌘</span>
          <h1>Acme Inc</h1>
        </div>
        <div className="testimonial">
          <p>
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </p>
          <p className="author">Sofia Davis</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <h2>Create an account</h2>
        <p>Enter your email below to create your account</p>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="primary-button" onClick={handleEmailSignUp}>
          Sign In with Email
        </button>
        <div className="divider">OR CONTINUE WITH</div>
        <button className="github-button" onClick={handleGoogleSignIn}>
          <span>GitHub</span>
        </button>
        <p className="terms">
          By clicking continue, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
