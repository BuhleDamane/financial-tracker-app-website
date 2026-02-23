import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { FiTrendingUp, FiShield, FiPieChart, FiTarget, FiBook, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login', { state: { showSignup: true } });
  };

  const handleSignIn = () => {
    navigate('/login', { state: { showSignup: false } });
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <FiTrendingUp />,
      title: 'Investment Tracking',
      description: 'Monitor stocks, crypto, pension funds, and retirement annuities in one dashboard',
      color: 'primary'
    },
    {
      icon: <FiPieChart />,
      title: 'Smart Budgeting',
      description: 'Track expenses with color-coded alerts for optimal financial health',
      color: 'success'
    },
    {
      icon: <FiTarget />,
      title: 'Goal Setting',
      description: 'Set and track financial goals with progress visualization',
      color: 'warning'
    },
    {
      icon: <FiShield />,
      title: 'Tax Calculator',
      description: 'SARS-compliant tax estimations and planning tools',
      color: 'danger'
    },
    {
      icon: <FiBook />,
      title: 'Financial Education',
      description: 'Learn about investing, budgeting, and wealth building',
      color: 'info'
    },
    {
      icon: <FiCheck />,
      title: 'All-in-One Platform',
      description: 'Everything you need for financial literacy and portfolio management',
      color: 'secondary'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Software Developer',
      content: 'This app helped me save 30% more each month and start investing properly.',
      avatar: 'SM'
    },
    {
      name: 'James T.',
      role: 'Financial Analyst',
      content: 'The tax calculator alone saved me thousands. Best financial tool I\'ve used.',
      avatar: 'JT'
    },
    {
      name: 'Lerato K.',
      role: 'Student',
      content: 'As a student, the budgeting features helped me manage my limited income effectively.',
      avatar: 'LK'
    }
  ];

  return (
    <div className="landing-page">
      <Navbar onSignIn={handleSignIn} onGetStarted={handleGetStarted} />

      <section className="hero-section" id="home" style={{ 
  background: 'linear-gradient(135deg, #e8f8f5 0%, #ffffff 100%)',
  minHeight: '100vh',
  paddingTop: '80px',
  paddingBottom: '60px'
}}>
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <p className="text-uppercase mb-3" style={{ 
                letterSpacing: '2px', 
                fontSize: '0.875rem',
                color: '#17a2b8',
                fontWeight: '600'
              }}>
                FINANCIAL LITERACY & PORTFOLIO MANAGEMENT
              </p>
              <h1 className="display-3 fw-bold mb-4" style={{ 
                color: '#2c3e50', 
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}>
                Take Control of Your <span style={{ color: '#17a2b8' }}>Financial</span> Future
              </h1>
              <p className="mb-4" style={{ 
                fontSize: '1.1rem', 
                color: '#6c757d',
                lineHeight: '1.7',
                maxWidth: '500px' 
              }}>
                Comprehensive financial education platform combined with personal portfolio management. 
                Track investments, manage budgets, set goals, and learn financial literacy.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Button 
                  size="lg" 
                  className="fw-bold px-4 py-3"
                  style={{
                    backgroundColor: '#17a2b8',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)'
                  }}
                  onClick={handleGetStarted}
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  className="fw-bold px-4 py-3"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #17a2b8',
                    color: '#17a2b8',
                    borderRadius: '8px'
                  }}
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-4 d-flex align-items-center">
                <div className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: '#ffc107', fontSize: '1.2rem' }} className="me-1">★</span>
                  ))}
                </div>
                <span className="ms-2" style={{ color: '#6c757d' }}>Rated 4.9/5 by financial experts</span>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div className="bg-white rounded-4 shadow-lg p-4" style={{ 
                  transform: 'rotate(2deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div className="bg-light rounded-3 p-4 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold" style={{ color: '#2c3e50', fontSize: '1.1rem' }}>
                        Investment Portfolio
                      </span>
                      <Badge bg="success" style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}>
                        +12.5%
                      </Badge>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" 
                           style={{ 
                             width: '200px', 
                             height: '200px',
                             background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
                             boxShadow: '0 8px 24px rgba(23, 162, 184, 0.3)'
                           }}>
                        <div className="text-center text-white">
                          <div className="fs-2 fw-bold">R45,000</div>
                          <div style={{ opacity: 0.9 }}>Total Value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="rounded-3 p-3" style={{ backgroundColor: '#e3f2fd' }}>
                        <div className="fw-bold" style={{ color: '#1976d2' }}>Stocks</div>
                        <div className="fs-5 fw-bold" style={{ color: '#2c3e50' }}>R25,000</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="rounded-3 p-3" style={{ backgroundColor: '#e8f5e9' }}>
                        <div className="fw-bold" style={{ color: '#388e3c' }}>Crypto</div>
                        <div className="fs-5 fw-bold" style={{ color: '#2c3e50' }}>R15,000</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-absolute floating-element" style={{ top: '20px', right: '-20px' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                       style={{ width: '60px', height: '60px', backgroundColor: '#fff3e0', border: '3px solid white' }}>
                    <span style={{ fontSize: '1.5rem' }}>📊</span>
                  </div>
                </div>
                <div className="position-absolute floating-element" style={{ bottom: '80px', left: '-30px', animationDelay: '1s' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                       style={{ width: '55px', height: '55px', backgroundColor: '#e8f5e9', border: '3px solid white' }}>
                    <span style={{ fontSize: '1.3rem' }}>💰</span>
                  </div>
                </div>
                <div className="position-absolute floating-element" style={{ top: '50%', right: '-15px', animationDelay: '2s' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                       style={{ width: '50px', height: '50px', backgroundColor: '#e3f2fd', border: '3px solid white' }}>
                    <span style={{ fontSize: '1.2rem' }}>📈</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white" id="features">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <p className="text-uppercase mb-3" style={{ letterSpacing: '2px', fontSize: '0.875rem', color: '#17a2b8', fontWeight: '600' }}>
                OUR FEATURES
              </p>
              <h2 className="fw-bold display-5 mb-3" style={{ color: '#2c3e50' }}>
                Everything You Need for Financial Success
              </h2>
              <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                Our comprehensive platform combines education with practical tools for complete financial management
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} lg={4} md={6}>
                <Card className="border-0 h-100" style={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}>
                  <Card.Body className="p-4">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                         style={{
                           width: '70px', height: '70px',
                           backgroundColor: feature.color === 'primary' ? '#e3f2fd' :
                                          feature.color === 'success' ? '#e8f5e9' :
                                          feature.color === 'warning' ? '#fff3e0' :
                                          feature.color === 'danger' ? '#ffebee' :
                                          feature.color === 'info' ? '#e0f7fa' : '#f3e5f5'
                         }}>
                      <span style={{ 
                        fontSize: '28px',
                        color: feature.color === 'primary' ? '#1976d2' :
                               feature.color === 'success' ? '#388e3c' :
                               feature.color === 'warning' ? '#f57c00' :
                               feature.color === 'danger' ? '#d32f2f' :
                               feature.color === 'info' ? '#0097a7' : '#7b1fa2'
                      }}>
                        {feature.icon}
                      </span>
                    </div>
                    <Card.Title className="fw-bold mb-3" style={{ color: '#2c3e50', fontSize: '1.25rem' }}>
                      {feature.title}
                    </Card.Title>
                    <Card.Text style={{ color: '#6c757d', lineHeight: '1.6' }}>
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }} id="how-it-works">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <p className="text-uppercase mb-3" style={{ letterSpacing: '2px', fontSize: '0.875rem', color: '#17a2b8', fontWeight: '600' }}>
                HOW IT WORKS
              </p>
              <h2 className="fw-bold display-5 mb-3" style={{ color: '#2c3e50' }}>
                Simple Steps to Financial Empowerment
              </h2>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              { num: 1, title: 'Sign Up Free', desc: 'Create your account in under 2 minutes', color: '#17a2b8' },
              { num: 2, title: 'Add Your Finances', desc: 'Input income, expenses, and investments', color: '#28a745' },
              { num: 3, title: 'Set Goals', desc: 'Define your financial objectives', color: '#ffc107' },
              { num: 4, title: 'Track & Grow', desc: 'Monitor progress and optimize your finances', color: '#17a2b8' }
            ].map((step, index) => (
              <Col key={index} md={3} className="text-center">
                <div className="position-relative mb-4">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" 
                       style={{ width: '80px', height: '80px', backgroundColor: step.color, color: 'white' }}>
                    <span className="fw-bold display-6">{step.num}</span>
                  </div>
                </div>
                <h5 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>{step.title}</h5>
                <p className="text-muted small">{step.desc}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white" id="testimonials">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <p className="text-uppercase mb-3" style={{ letterSpacing: '2px', fontSize: '0.875rem', color: '#17a2b8', fontWeight: '600' }}>
                TESTIMONIALS
              </p>
              <h2 className="fw-bold display-5 mb-3" style={{ color: '#2c3e50' }}>Trusted by Thousands</h2>
              <p className="text-muted lead">See what our users are saying</p>
            </Col>
          </Row>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col key={index} lg={4} md={6}>
                <Card className="border-0 h-100" style={{
                  borderRadius: '16px',
                  backgroundColor: index === 1 ? '#17a2b8' : '#f8f9fa',
                  color: index === 1 ? 'white' : '#2c3e50',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                           style={{ width: '50px', height: '50px', backgroundColor: index === 1 ? 'rgba(255,255,255,0.2)' : '#e9ecef' }}>
                        <span className="fw-bold" style={{ color: index === 1 ? 'white' : '#17a2b8' }}>
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="fw-bold">{testimonial.name}</div>
                        <div className="small" style={{ opacity: 0.8 }}>{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="mb-3" style={{ lineHeight: '1.6' }}>"{testimonial.content}"</p>
                    <div className="text-end">
                      <span style={{ fontSize: '2rem', opacity: 0.3 }}>❝</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', color: 'white' }}>
        <Container>
          <Row className="py-5 align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <p className="text-uppercase mb-3" style={{ letterSpacing: '2px', fontSize: '0.875rem', opacity: 0.9 }}>
                START TODAY
              </p>
              <h2 className="fw-bold display-5 mb-4">Ready to Transform Your Financial Life?</h2>
              <p className="lead mb-4" style={{ opacity: 0.9, maxWidth: '500px' }}>
                Join thousands of users who have taken control of their finances with our platform
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button size="lg" className="fw-bold px-5 py-3"
                  style={{ backgroundColor: 'white', border: 'none', color: '#17a2b8', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  onClick={handleGetStarted}
                >
                  Start Free Trial
                </Button>
                <Button size="lg" className="fw-bold px-5 py-3"
                  style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', borderRadius: '8px' }}
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
              <p className="mt-3 small" style={{ opacity: 0.75 }}>No credit card required • Cancel anytime</p>
            </Col>
            <Col lg={6}>
              <div className="bg-white rounded-4 p-4 shadow-lg">
                <div className="text-center mb-3">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px', backgroundColor: '#e0f7fa' }}>
                    <span style={{ fontSize: '2rem' }}>💼</span>
                  </div>
                </div>
                <div className="bg-light rounded-3 p-4 text-center">
                  <h4 style={{ color: '#2c3e50' }}>Financial Dashboard Preview</h4>
                  <p className="text-muted mb-0">Track everything in real-time</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="py-5" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
        <Container>
          <Row className="mb-4">
            <Col lg={4} className="mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '40px', height: '40px', backgroundColor: '#17a2b8' }}>
                  <span className="text-white fw-bold">FT</span>
                </div>
                <span className="fw-bold fs-5">Financial Tracker</span>
              </div>
              <p className="small mb-0" style={{ opacity: 0.8, maxWidth: '300px' }}>
                Comprehensive financial education platform combined with personal portfolio management.
              </p>
            </Col>
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h6 className="fw-bold mb-3">Platform</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Dashboard</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Investments</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Budget</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Education</a></li>
              </ul>
            </Col>
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h6 className="fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Help Center</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Blog</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Guides</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>FAQ</a></li>
              </ul>
            </Col>
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>About Us</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Careers</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Contact</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Press</a></li>
              </ul>
            </Col>
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Terms of Service</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Cookie Policy</a></li>
              </ul>
            </Col>
          </Row>

          <hr style={{ opacity: 0.2, margin: '2rem 0' }} />

          <Row>
            <Col className="text-center">
              <p className="mb-0 small" style={{ opacity: 0.8 }}>
                © {new Date().getFullYear()} Financial Literacy & Portfolio Tracker. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;