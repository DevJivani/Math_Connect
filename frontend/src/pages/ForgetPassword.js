// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { baseUrl } from '../Urls';

// const ForgetPassword = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpToken, setOtpToken] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
//   const formRef = useRef(null);

//   // Similar background effect as in Login.js
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const symbols = ['∑', '∫', '∏', '√', 'π', '∞'];
//     const particles = [];

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 30 + 15;
//         this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
//         this.speedX = Math.random() * 3 - 1.5;
//         this.speedY = Math.random() * 3 - 1.5;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x > canvas.width) this.x = 0;
//         if (this.x < 0) this.x = canvas.width;
//         if (this.y > canvas.height) this.y = 0;
//         if (this.y < 0) this.y = canvas.height;
//       }

//       draw() {
//         ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
//         ctx.font = `${this.size}px Arial`;
//         ctx.fillText(this.symbol, this.x, this.y);
//       }
//     }

//     for (let i = 0; i < 50; i++) {
//       particles.push(new Particle());
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });
//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const animateForm = (form, delay) => {
//       setTimeout(() => {
//         form.style.opacity = '1';
//         form.style.transform = 'translateY(0)';
//       }, delay);
//     };

//     animateForm(formRef.current, 300);
//   }, []);

  

//   const handleOtpSubmit = async (e) => {
//     console.log("onverfiy clik")
//     e.preventDefault();
//     try {
//       const response = await fetch(`${baseUrl}/api/user/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp, otpToken }),
//       });
//       const data = await response.json();

//       if (data.message === 'OTP verified') {
//         console.log("verified");
//         setStep(3);  // Move to the password reset step
//       }
//       else{
//         alert("OTP is not valid!!")
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//     }
//   };

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${baseUrl}/api/user/reset-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, newPassword }),
//       });
//       const data = await response.json();
//       console.log("hello")
//       if (data.message === 'Password reset successfully.') {
//         alert('Password reset successful! You can now log in with your new password.');

//         setTimeout(() => {
//             navigate('/login'); 
//           }, 2000);
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//     }
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${baseUrl}/api/user/send-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (data.otpToken) {
//         setOtpToken(data.otpToken);  // Store OTP token in state
//         setStep(2);  // Move to the OTP step
//       }
//       else{
//         alert("Email is not exist")
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <canvas ref={canvasRef} style={styles.canvas}></canvas>
//       <div style={styles.content}>
//         <form ref={formRef} onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handleOtpSubmit : handlePasswordReset} style={styles.form}>
//           <h2 style={styles.title}>Forgot Password</h2>
//           {step === 1 && (
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={styles.input}
//                 required
//               />
//               <button type="submit" style={styles.button}>Send OTP</button>
//             </div>
//           )}
//           {step === 2 && (
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 style={styles.input}
//                 required
//               />
//               <button type="submit" style={styles.button}>Verify OTP</button>
//             </div>
//           )}
//           {step === 3 && (
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 style={styles.input}
//                 required
//               />
//               <button type="submit" style={styles.button}>Reset Password</button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     position: 'relative',
//     height: '100vh',
//     overflow: 'hidden',
//     backgroundColor: '#f0f0f0',
//   },
//   canvas: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 1,
//   },
//   content: {
//     position: 'relative',
//     zIndex: 2,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//   },
//   form: {
//     backgroundColor: 'white',
//     padding: '30px',
//     borderRadius: '12px',
//     boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
//     maxWidth: '400px',
//     width: '100%',
//     opacity: 0,
//     transform: 'translateY(-50px)',
//     transition: 'opacity 0.5s ease, transform 0.5s ease',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: '20px',
//     fontSize: '24px',
//     color: '#333',
//     fontWeight: '600',
//   },
//   inputGroup: {
//     marginBottom: '15px',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '8px',
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   input: {
//     width: '94%',
//     padding: '12px',
//     fontSize: '16px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     outline: 'none',
//     transition: 'border-color 0.3s ease',
//   },
//   button: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     marginTop: '10px',
//   },
// };

// export default ForgetPassword;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';
import axiosInstance from '../axiosConfig';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const formRef = useRef(null);

  // Background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = ['∑', '∫', '∏', '√', 'π', '∞'];
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 15;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const animateForm = (form, delay) => {
      setTimeout(() => {
        form.style.opacity = '1';
        form.style.transform = 'translateY(0)';
      }, delay);
    };
    animateForm(formRef.current, 300);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axiosInstance.post('/api/user/send-otp', { email });
      
      if (response.data.otpToken) {
        setOtpToken(response.data.otpToken);
        setMessage('OTP sent to your email! Check your inbox.');
        setStep(2);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axiosInstance.post('/api/user/verify-otp', {
        email,
        otp,
        otpToken
      });
      
      if (response.data.message === 'OTP verified successfully.') {
        setMessage('OTP verified successfully!');
        setStep(3);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axiosInstance.post('/api/user/reset-password', {
        email,
        newPassword
      });
      
      if (response.data.message === 'Password reset successfully. You can now log in with your new password.') {
        setMessage('Password reset successfully! Redirecting to login...');
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
      setMessage('');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas}></canvas>
      <div style={styles.content}>
        <form 
          ref={formRef} 
          onSubmit={
            step === 1 ? handleEmailSubmit : 
            step === 2 ? handleOtpSubmit : 
            handlePasswordReset
          } 
          style={styles.form}
        >
          <h2 style={styles.title}>Forgot Password</h2>
          
          {message && (
            <div style={styles.successMessage}>
              {message}
            </div>
          )}
          
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div style={styles.stepIndicator}>
            Step {step} of 3
          </div>
          
          {step === 1 && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={styles.input} 
                placeholder="Enter your registered email"
                required 
                disabled={loading}
              />
              <button 
                type="submit" 
                style={styles.button}
                disabled={loading || !email}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          )}
          
          {step === 2 && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Enter OTP</label>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                style={styles.input} 
                placeholder="Enter 6-digit OTP"
                required 
                maxLength="6"
                disabled={loading}
              />
              <div style={styles.otpHint}>
                Check your email for the 6-digit OTP
              </div>
              <button 
                type="submit" 
                style={styles.button}
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}
          
          {step === 3 && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                style={styles.input} 
                placeholder="Enter new password"
                required 
                disabled={loading}
              />
              <div style={styles.passwordRules}>
                Password must contain:
                <ul style={styles.rulesList}>
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
              <button 
                type="submit" 
                style={styles.button}
                disabled={loading || newPassword.length < 8}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </div>
          )}
          
          <div style={styles.footer}>
            <button 
              type="button" 
              onClick={goBack}
              style={styles.backButton}
            >
              {step === 1 ? 'Back to Login' : 'Back'}
            </button>
            <span 
              style={styles.loginLink}
              onClick={() => navigate('/login')}
            >
              Remember password? Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    maxWidth: '450px',
    width: '100%',
    opacity: 0,
    transform: 'translateY(-50px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
    fontWeight: '600',
  },
  stepIndicator: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  },
  otpHint: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
    marginBottom: '15px',
  },
  passwordRules: {
    fontSize: '12px',
    color: '#666',
    marginTop: '10px',
    marginBottom: '15px',
  },
  rulesList: {
    margin: '5px 0 0 15px',
    padding: 0,
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  backButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  loginLink: {
    display: 'block',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default ForgetPassword;