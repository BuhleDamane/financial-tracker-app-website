import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';

interface LocationState {
  showSignup?: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, signInWithGoogle } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.showSignup === true) setIsLogin(false);
    else if (state?.showSignup === false) setIsLogin(true);
    window.history.replaceState({}, document.title);
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!isLogin && password !== confirmPassword) {
      return setError('Passwords do not match!');
    }

    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await login(email, password);
        if (!userCredential.user.emailVerified) {
          await auth.signOut();
          setLoading(false);
          return setError('Please verify your email before logging in. Check your inbox.');
        }
        navigate('/dashboard');
      } else {
        await register(email, password, firstName, lastName);
        setMessage('Account created! A verification link has been sent to your email. Please verify before logging in.');
        setIsLogin(true);
        setEmail(''); setPassword(''); setConfirmPassword('');
        setFirstName(''); setLastName('');
      }
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found': setError('No account found with this email.'); break;
        case 'auth/wrong-password': setError('Incorrect password. Please try again.'); break;
        case 'auth/invalid-credential': setError('Invalid email or password. Please try again.'); break;
        case 'auth/email-already-in-use': setError('An account with this email already exists.'); break;
        case 'auth/weak-password': setError('Password should be at least 6 characters.'); break;
        case 'auth/invalid-email': setError('Please enter a valid email address.'); break;
        default: setError('Something went wrong. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in with Google. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              position: 'relative'
            }}>

              {}
              <button
                onClick={() => navigate('/')}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: 1
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'white';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)';
                }}
                aria-label="Close"
              >
                ✕
              </button>

              {}
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #17a2b8, #138496)', boxShadow: '0 8px 20px rgba(23,162,184,0.4)' }}>
                  <span className="text-white fw-bold fs-4">FT</span>
                </div>
                <h2 className="fw-bold mb-1" style={{ color: 'white', fontSize: '1.8rem' }}>
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  {isLogin ? 'Sign in to manage your finances' : 'Start your financial journey today'}
                </p>
              </div>

              {}
              <div className="d-flex mb-4" style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '4px'
              }}>
                <button
                  onClick={() => { setIsLogin(true); setError(''); setMessage(''); }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: isLogin ? 'white' : 'transparent',
                    color: isLogin ? '#17a2b8' : 'rgba(255,255,255,0.6)'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsLogin(false); setError(''); setMessage(''); }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: !isLogin ? 'white' : 'transparent',
                    color: !isLogin ? '#17a2b8' : 'rgba(255,255,255,0.6)'
                  }}
                >
                  Sign Up
                </button>
              </div>

              {}
              {error && (
                <div style={{
                  background: 'rgba(211,47,47,0.15)',
                  border: '1px solid rgba(211,47,47,0.4)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ff8a80',
                  fontSize: '0.9rem',
                  marginBottom: '20px'
                }}>
                  {error}
                </div>
              )}
              {message && (
                <div style={{
                  background: 'rgba(56,142,60,0.15)',
                  border: '1px solid rgba(56,142,60,0.4)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#69f0ae',
                  fontSize: '0.9rem',
                  marginBottom: '20px'
                }}>
                  {message}
                </div>
              )}

              {}
              <Form onSubmit={handleSubmit}>
                {!isLogin && (
                  <Row className="g-3 mb-3">
                    <Col>
                      <Form.Label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.9rem' }}>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '10px',
                          color: 'white',
                          padding: '12px 14px'
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.9rem' }}>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '10px',
                          color: 'white',
                          padding: '12px 14px'
                        }}
                      />
                    </Col>
                  </Row>
                )}

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      color: 'white',
                      padding: '12px 14px'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.9rem' }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      color: 'white',
                      padding: '12px 14px'
                    }}
                  />
                </Form.Group>

                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '0.9rem' }}>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '10px',
                        color: 'white',
                        padding: '12px 14px'
                      }}
                    />
                  </Form.Group>
                )}

                <Button
                  type="submit"
                  className="w-100 fw-bold mt-2"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #17a2b8, #138496)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '13px',
                    fontSize: '1rem',
                    boxShadow: '0 8px 20px rgba(23,162,184,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </Form>

              {}
              <div className="d-flex align-items-center my-4">
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '0 12px' }}>or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
              </div>

              {}
              <Button
                className="w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  color: 'white',
                  padding: '12px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {}
              <div className="text-center mt-4">
                <span
                  onClick={() => navigate('/')}
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  ← Back to home
                </span>
              </div>

            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.3) !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.08) inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;