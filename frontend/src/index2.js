import React from 'react';
import './styles.css';
import PrototypeImage from './PrototypeImage';

function ComingSoon() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNotifyMe = () => {
    // Simulate email capture (no actual email sent)
    alert(`Thanks for your interest, ${email}! We'll notify you when we launch.`);
    setEmail(''); // Clear email input after submission
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Coming Soon!</h1>
        <p>We're launching something stellar...</p>
        <button onClick={handleNotifyMe}>Notify Me</button>
      </div>
      <div className="prototype">
        <h2>Prototype</h2>
        <PrototypeImage />
      </div>
      <div className="notify">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleNotifyMe}>
          <span>Notify Me</span>
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;
