import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { FiTrendingUp, FiShield, FiPieChart, FiTarget, FiBook, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

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
      {/* Hero Section */}
      <section className="hero-section py-5" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 playfair-font">
                Take Control of Your Financial Future
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                Comprehensive financial education platform combined with personal portfolio management. 
                Track investments, manage budgets, set goals, and learn financial literacy.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  variant="light" 
                  className="fw-bold px-4 py-3"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline-light" 
                  className="fw-bold px-4 py-3"
                  onClick={() => navigate('/education')}
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-4 d-flex align-items-center">
                <div className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-warning me-1">★</span>
                  ))}
                </div>
                <span className="ms-2">Rated 4.9/5 by financial experts</span>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div className="bg-white rounded-4 shadow-lg p-4" style={{ transform: 'rotate(3deg)' }}>
                  <div className="bg-light rounded-3 p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-dark">Investment Portfolio</span>
                      <Badge bg="success">+12.5%</Badge>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <div className="position-relative">
                        <div className="rounded-circle border border-4 border-primary d-flex align-items-center justify-content-center" 
                             style={{ width: '200px', height: '200px' }}>
                          <div className="text-center">
                            <div className="fs-2 fw-bold text-dark">R45,000</div>
                            <div className="text-muted">Total Value</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="bg-primary-subtle rounded-3 p-3">
                        <div className="text-primary fw-bold">Stocks</div>
                        <div className="fs-5 fw-bold">R25,000</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-success-subtle rounded-3 p-3">
                        <div className="text-success fw-bold">Crypto</div>
                        <div className="fs-5 fw-bold">R15,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="ubuntu-font fw-bold display-5 mb-3">
                Everything You Need for Financial Success
              </h2>
              <p className="text-muted lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Our comprehensive platform combines education with practical tools for complete financial management
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} lg={4} md={6}>
                <Card className="border-0 shadow-sm h-100 card-hover">
                  <Card.Body className="p-4">
                    <div className={`rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-4 bg-${feature.color}-subtle`}>
                      <span className={`text-${feature.color}`} style={{ fontSize: '28px' }}>
                        {feature.icon}
                      </span>
                    </div>
                    <Card.Title className="ubuntu-font fw-bold mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="ubuntu-font fw-bold display-5 mb-3">
                How It Works
              </h2>
              <p className="text-muted lead">Simple steps to financial empowerment</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={3} className="text-center">
              <div className="position-relative mb-4">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <span className="text-white fw-bold display-6">1</span>
                </div>
                <div className="position-absolute top-50 start-100 translate-middle d-none d-md-block">
                  <div className="bg-primary" style={{ width: '100px', height: '2px' }}></div>
                </div>
              </div>
              <h5 className="fw-bold mb-2">Sign Up Free</h5>
              <p className="text-muted small">Create your account in under 2 minutes</p>
            </Col>
            
            <Col md={3} className="text-center">
              <div className="position-relative mb-4">
                <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <span className="text-white fw-bold display-6">2</span>
                </div>
                <div className="position-absolute top-50 start-100 translate-middle d-none d-md-block">
                  <div className="bg-success" style={{ width: '100px', height: '2px' }}></div>
                </div>
              </div>
              <h5 className="fw-bold mb-2">Add Your Finances</h5>
              <p className="text-muted small">Input income, expenses, and investments</p>
            </Col>
            
            <Col md={3} className="text-center">
              <div className="position-relative mb-4">
                <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <span className="text-white fw-bold display-6">3</span>
                </div>
                <div className="position-absolute top-50 start-100 translate-middle d-none d-md-block">
                  <div className="bg-warning" style={{ width: '100px', height: '2px' }}></div>
                </div>
              </div>
              <h5 className="fw-bold mb-2">Set Goals</h5>
              <p className="text-muted small">Define your financial objectives</p>
            </Col>
            
            <Col md={3} className="text-center">
              <div className="mb-4">
                <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <span className="text-white fw-bold display-6">4</span>
                </div>
              </div>
              <h5 className="fw-bold mb-2">Track & Grow</h5>
              <p className="text-muted small">Monitor progress and optimize your finances</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="ubuntu-font fw-bold display-5 mb-3">
                Trusted by Thousands
              </h2>
              <p className="text-muted lead">See what our users are saying</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col key={index} lg={4} md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center me-3" 
                           style={{ width: '50px', height: '50px' }}>
                        <span className="text-primary fw-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <div className="fw-bold">{testimonial.name}</div>
                        <div className="text-muted small">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="mb-0">"{testimonial.content}"</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              <h2 className="ubuntu-font fw-bold display-5 mb-4">
                Ready to Transform Your Financial Life?
              </h2>
              <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
                Join thousands of users who have taken control of their finances with our platform
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button 
                  size="lg" 
                  variant="primary" 
                  className="fw-bold px-5 py-3"
                  onClick={() => navigate('/dashboard')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline-light" 
                  className="fw-bold px-5 py-3"
                  onClick={() => navigate('/education')}
                >
                  Watch Demo
                </Button>
              </div>
              <p className="mt-3 small opacity-75">
                No credit card required • Cancel anytime
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '40px', height: '40px' }}>
                  <span className="text-white fw-bold">FT</span>
                </div>
                <span className="text-white fw-bold fs-5">Financial Tracker</span>
              </div>
              <p className="text-muted small mt-2 mb-0">
                © {new Date().getFullYear()} Financial Literacy & Portfolio Tracker. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
                <a href="#" className="text-white text-decoration-none">Terms of Service</a>
                <a href="#" className="text-white text-decoration-none">Contact Us</a>
                <a href="#" className="text-white text-decoration-none">Help Center</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;