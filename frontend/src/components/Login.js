import React, { useState } from 'react';
import { auth } from '../services/firebase'; 
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import ShinyButton from './ShinyButton';  // Import the new shiny button
import GoogleButton from './GoogleButton'; // Import the Google button
import './Login.css';  // Make sure your .button-secondary class is in this file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
      setError("Error during Google sign-in. Please try again.");
    }
  };

  const handleEmailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError("Incorrect login credentials. Please try again.");
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      // Check the error code and set a custom message
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError("Incorrect login credentials. Please try again."); // Custom error message
      } else {
        setError("Incorrect login credentials. Please try again.");
      }
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <div className={`logincontent ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
      <h2>Login/Sign up</h2>
      <h3>Or sign in with Google</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      {/* Buttons Container */}
      <div className="button-container">
        <ShinyButton label="Sign Up" onClick={handleEmailSignUp} className="button-secondary" />
        <ShinyButton label="Login" onClick={handleEmailLogin} className="button-secondary" />
      </div>

      {/* Google Sign In Button */}
      <div className="loginbutton google-button">
        <GoogleButton onClick={handleGoogleLogin} /> {/* Ensure GoogleButton accepts onClick prop */}
      </div>
    </div>
  );
};

export default Login;
