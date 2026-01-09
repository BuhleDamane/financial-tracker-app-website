import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FiArrowUpRight, FiTrendingUp, FiTarget, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    { title: 'Total Investments', value: 'R45,000', change: '+12%', icon: <FiTrendingUp />, color: 'success' },
    { title: 'Monthly Income', value: 'R25,000', change: '+5%', icon: <FiArrowUpRight />, color: 'primary' },
    { title: 'Monthly Expenses', value: 'R18,000', change: '-2%', icon: <FiAlertCircle />, color: 'warning' },
    { title: 'Goals Progress', value: '65%', change: '+8%', icon: <FiTarget />, color: 'info' },
  ];

  const recentActivities = [
    { action: 'Added new investment', entity: 'Tesla Stock', time: '2 hours ago', type: 'investment' },
    { action: 'Updated monthly budget', entity: 'November Budget', time: '1 day ago', type: 'budget' },
    { action: 'Set new goal', entity: 'Emergency Fund', time: '3 days ago', type: 'goal' },
    { action: 'Completed lesson', entity: 'Stock Market Basics', time: '1 week ago', type: 'education' },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
            Welcome back, John! 👋
          </h1>
          <p className="text-muted">
            Track your finances, monitor investments, and achieve your financial goals
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        {quickStats.map((stat, index) => (
          <Col key={index} lg={3} md={6} className="mb-3">
            <Card className="card-hover border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-1">{stat.title}</h6>
                    <h3 className="fw-bold mb-2">{stat.value}</h3>
                    <span className={`text-${stat.color} small fw-medium`}>
                      {stat.change} from last month
                    </span>
                  </div>
                  <div className={`bg-${stat.color}-subtle p-2 rounded-circle`}>
                    {React.cloneElement(stat.icon, { size: 24, className: `text-${stat.color}` })}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <Card.Title className="ubuntu-font fw-bold mb-1">Investment Allocation</Card.Title>
                  <p className="text-muted small">Distribution across different investment types</p>
                </div>
                <Button 
                  variant="primary" 
                  className="btn-primary-custom"
                  onClick={() => navigate('/investments')}
                >
                  View Details
                </Button>
              </div>
              
              <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                <div className="text-center">
                  <div className="position-relative d-inline-block mb-3">
                    <div className="rounded-circle border d-flex align-items-center justify-content-center" 
                         style={{ width: '150px', height: '150px', borderWidth: '20px !important' }}>
                      <div className="text-center">
                        <div className="fw-bold fs-4">No Data</div>
                        <small className="text-muted">Add investments to see chart</small>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/investments')}
                  >
                    Add Your First Investment
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">Recent Activity</Card.Title>
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="d-flex align-items-start mb-3">
                    <div className={`rounded-circle p-2 me-3 ${
                      activity.type === 'investment' ? 'bg-primary-subtle' :
                      activity.type === 'budget' ? 'bg-warning-subtle' :
                      activity.type === 'goal' ? 'bg-success-subtle' : 'bg-info-subtle'
                    }`}>
                      {activity.type === 'investment' && <FiTrendingUp className="text-primary" />}
                      {activity.type === 'budget' && <FiAlertCircle className="text-warning" />}
                      {activity.type === 'goal' && <FiTarget className="text-success" />}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-medium">{activity.action}</div>
                      <div className="text-muted small">{activity.entity}</div>
                      <div className="text-muted small">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="ubuntu-font fw-bold mb-0">Budget Status</Card.Title>
                <span className="badge bg-success">On Track</span>
              </div>
              <ProgressBar now={65} variant="success" className="mb-3" style={{ height: '10px' }} />
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Spent: R11,700</span>
                <span className="text-muted">Budget: R18,000</span>
              </div>
              <Button 
                variant="outline-primary" 
                className="mt-3 w-100"
                onClick={() => navigate('/budget')}
              >
                Manage Budget
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="ubuntu-font fw-bold mb-0">Goals Progress</Card.Title>
                <span className="badge bg-info">2 of 5 Complete</span>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Emergency Fund</span>
                  <span>80%</span>
                </div>
                <ProgressBar now={80} variant="info" className="mb-2" />
                
                <div className="d-flex justify-content-between mb-1">
                  <span>Student Loan</span>
                  <span>45%</span>
                </div>
                <ProgressBar now={45} variant="warning" className="mb-2" />
              </div>
              <Button 
                variant="outline-primary" 
                className="mt-2 w-100"
                onClick={() => navigate('/goals')}
              >
                View All Goals
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;