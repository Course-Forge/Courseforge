import React, { useState } from 'react';
import { auth } from '../services/firebase'; 
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

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
      setError(error.message);
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
      setError(error.message);
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
      setError(error.message);
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
      <h2>Login</h2>
      <h3>Or Sign in with Email and Password</h3>

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
      <div className='loginbutton'>
        <button onClick={handleEmailSignUp}>Sign Up</button>
        <button onClick={handleEmailLogin}>Login</button>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
