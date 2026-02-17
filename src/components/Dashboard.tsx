import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FiArrowUpRight, FiTrendingUp, FiTarget, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h1 className="ubuntu-font fw-bold mb-2" style={{ color: '#2c3e50', fontSize: '2rem' }}>
                Welcome to Financial Tracker! 👋
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: '1rem' }}>
                Track your finances, monitor investments, and achieve your financial goals
              </p>
            </div>
            <Button 
              size="lg"
              style={{
                backgroundColor: '#17a2b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 2rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)'
              }}
              onClick={() => navigate('/investments')}
            >
              + Add Investment
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4 g-3">
        <Col lg={3} md={6}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <p className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Total Investments
                  </p>
                  <h2 className="fw-bold mb-1" style={{ color: '#2c3e50', fontSize: '1.75rem' }}>
                    R0
                  </h2>
                  <span style={{ 
                    color: '#6c757d',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    Get started
                  </span>
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '60px', 
                       height: '60px',
                       backgroundColor: '#e0f7fa'
                     }}>
                  <FiTrendingUp size={28} style={{ color: '#17a2b8' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <p className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Monthly Income
                  </p>
                  <h2 className="fw-bold mb-1" style={{ color: '#2c3e50', fontSize: '1.75rem' }}>
                    R0
                  </h2>
                  <span style={{ 
                    color: '#6c757d',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    Add income
                  </span>
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '60px', 
                       height: '60px',
                       backgroundColor: '#e8f5e9'
                     }}>
                  <FiArrowUpRight size={28} style={{ color: '#28a745' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <p className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Monthly Expenses
                  </p>
                  <h2 className="fw-bold mb-1" style={{ color: '#2c3e50', fontSize: '1.75rem' }}>
                    R0
                  </h2>
                  <span style={{ 
                    color: '#6c757d',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    Track expenses
                  </span>
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '60px', 
                       height: '60px',
                       backgroundColor: '#fff3e0'
                     }}>
                  <FiAlertCircle size={28} style={{ color: '#ffc107' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <p className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Goals Progress
                  </p>
                  <h2 className="fw-bold mb-1" style={{ color: '#2c3e50', fontSize: '1.75rem' }}>
                    0%
                  </h2>
                  <span style={{ 
                    color: '#6c757d',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    Set goals
                  </span>
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '60px', 
                       height: '60px',
                       backgroundColor: '#e0f7fa'
                     }}>
                  <FiTarget size={28} style={{ color: '#17a2b8' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

   
      <Row className="mb-4 g-3">
        <Col lg={8}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="ubuntu-font fw-bold mb-1" style={{ color: '#2c3e50' }}>
                    Investment Allocation
                  </h4>
                  <p className="text-muted small mb-0">Distribution across different investment types</p>
                </div>
                <Button 
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #17a2b8',
                    color: '#17a2b8',
                    borderRadius: '8px',
                    padding: '0.5rem 1.5rem',
                    fontWeight: 600
                  }}
                  onClick={() => navigate('/investments')}
                >
                  View Details
                </Button>
              </div>
              
              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="text-center">
                  <div className="mb-3">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ 
                           width: '100px', 
                           height: '100px',
                           backgroundColor: '#e0f7fa'
                         }}>
                      <FiTrendingUp size={48} style={{ color: '#17a2b8' }} />
                    </div>
                  </div>
                  <h5 className="mb-2" style={{ color: '#6c757d' }}>No investments yet</h5>
                  <p className="text-muted small mb-4">Start tracking your portfolio</p>
                  <Button 
                    style={{
                      backgroundColor: '#17a2b8',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 2rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)'
                    }}
                    onClick={() => navigate('/investments')}
                  >
                    + Add Your First Investment
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <Card.Body className="p-4">
              <h4 className="ubuntu-font fw-bold mb-4" style={{ color: '#2c3e50' }}>
                Recent Activity
              </h4>
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '250px' }}>
                <div className="mb-3">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{ 
                         width: '80px', 
                         height: '80px',
                         backgroundColor: '#f8f9fa'
                       }}>
                    <FiTarget size={36} style={{ color: '#6c757d' }} />
                  </div>
                </div>
                <p className="text-muted text-center mb-0">No recent activity</p>
                <small className="text-muted text-center">Activity will appear here</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={6}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="ubuntu-font fw-bold mb-0" style={{ color: '#2c3e50' }}>
                  Budget Status
                </h4>
                <span className="badge" style={{
                  backgroundColor: '#e9ecef',
                  color: '#6c757d',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  Not Set
                </span>
              </div>
              
              <div className="mb-4">
                <ProgressBar 
                  now={0} 
                  style={{ 
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: '#e9ecef'
                  }}
                />
              </div>
              
              <div className="d-flex justify-content-between p-3 rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                <div>
                  <div className="text-muted small mb-1">Spent</div>
                  <div className="fw-bold" style={{ color: '#2c3e50', fontSize: '1.25rem' }}>R0</div>
                </div>
                <div className="text-end">
                  <div className="text-muted small mb-1">Budget</div>
                  <div className="fw-bold" style={{ color: '#2c3e50', fontSize: '1.25rem' }}>R0</div>
                </div>
              </div>
              
              <Button 
                className="w-100"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #17a2b8',
                  color: '#17a2b8',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontWeight: 600
                }}
                onClick={() => navigate('/budget')}
              >
                Create Budget
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 h-100" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="ubuntu-font fw-bold mb-0" style={{ color: '#2c3e50' }}>
                  Goals Progress
                </h4>
                <span className="badge" style={{
                  backgroundColor: '#e9ecef',
                  color: '#6c757d',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  0 Goals
                </span>
              </div>
              
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '180px' }}>
                <div className="mb-3">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{ 
                         width: '80px', 
                         height: '80px',
                         backgroundColor: '#f8f9fa'
                       }}>
                    <FiTarget size={36} style={{ color: '#6c757d' }} />
                  </div>
                </div>
                <p className="text-muted text-center mb-0">No goals set</p>
                <small className="text-muted text-center mb-4">Create your first goal</small>
              </div>
              
              <Button 
                className="w-100"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #17a2b8',
                  color: '#17a2b8',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontWeight: 600
                }}
                onClick={() => navigate('/goals')}
              >
                Set Your First Goal
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;