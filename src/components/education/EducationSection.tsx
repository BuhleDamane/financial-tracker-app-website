import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Badge, Button } from 'react-bootstrap';
import { FiBook, FiTrendingUp, FiDollarSign, FiPercent, FiTarget } from 'react-icons/fi';
import { educationTopics } from '../../data/mockData';

const EducationSection: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const educationModules = [
    {
      title: 'Budgeting Basics',
      icon: <FiDollarSign />,
      description: 'Learn how to create and maintain a personal budget',
      topics: [
        {
          title: 'What is Budgeting?',
          content: 'Budgeting is the process of creating a plan to spend your money. This spending plan is called a budget. Creating this spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do.'
        },
        {
          title: '50/30/20 Rule',
          content: 'The 50/30/20 rule is a simple budgeting technique: 50% of income for needs (rent, food, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment.'
        },
        {
          title: 'Tracking Expenses',
          content: 'Use apps, spreadsheets, or notebooks to track every expense. Categorize expenses to identify spending patterns and areas for improvement.'
        }
      ]
    },
    {
      title: 'Investment Fundamentals',
      icon: <FiTrendingUp />,
      description: 'Understanding different types of investments',
      topics: [
        {
          title: 'What are Stocks?',
          content: 'Stocks represent ownership shares in a company. When you buy a stock, you become a partial owner of that company.'
        },
        {
          title: 'Understanding Cryptocurrency',
          content: 'Cryptocurrency is a digital or virtual currency secured by cryptography. Bitcoin, Ethereum, and other cryptocurrencies operate on blockchain technology.'
        },
        {
          title: 'Retirement Planning',
          content: 'Start planning for retirement early. Consider options like Retirement Annuities (RAs), Pension Funds, and Tax-Free Savings Accounts (TFSAs).'
        },
        {
          title: 'EasyEquities Explained',
          content: 'EasyEquities is a South African platform that allows you to buy fractional shares with small amounts of money, making investing accessible to everyone.'
        }
      ]
    },
    {
      title: 'Saving Strategies',
      icon: <FiTarget />,
      description: 'Effective ways to save money and build wealth',
      topics: [
        {
          title: 'Emergency Funds',
          content: 'Save 3-6 months of living expenses in an easily accessible account for unexpected situations like job loss or medical emergencies.'
        },
        {
          title: 'Automated Savings',
          content: 'Set up automatic transfers to your savings account right after payday. This follows the "pay yourself first" principle.'
        },
        {
          title: 'Goal-Based Saving',
          content: 'Create specific savings goals (car, house, vacation) and track your progress. This makes saving more intentional and motivating.'
        }
      ]
    },
    {
      title: 'Tax Essentials',
      icon: <FiPercent />,
      description: 'Understanding taxes and financial regulations in South Africa',
      topics: [
        {
          title: 'SARS Tax Brackets',
          content: 'South Africa uses progressive tax brackets. For 2024, the rates range from 18% for income up to R237,100 to 45% for income over R1,817,000.'
        },
        {
          title: 'Tax Deductions',
          content: 'Common deductions include retirement fund contributions (up to 27.5% of income), medical expenses, and certain business expenses.'
        },
        {
          title: 'TFSA Benefits',
          content: 'Tax-Free Savings Accounts allow you to invest up to R36,000 per year (lifetime limit R500,000) with all returns being tax-free.'
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budgeting': return 'info';
      case 'investing': return 'success';
      case 'saving': return 'warning';
      case 'taxes': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="text-center mb-5">
            <div className="display-1 text-primary mb-3">
              <FiBook />
            </div>
            <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
              Financial Education Hub
            </h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Learn essential financial concepts to make informed decisions and grow your wealth
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="ubuntu-font fw-bold mb-3">Quick Start Guide</h3>
                <p className="text-muted">
                  Follow these steps to build your financial literacy foundation
                </p>
              </div>
              
              <Row className="g-4">
                <Col md={3} className="text-center">
                  <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                    <span className="text-primary fw-bold display-6">1</span>
                  </div>
                  <h6 className="fw-bold">Track Income & Expenses</h6>
                  <small className="text-muted">Know where your money goes</small>
                </Col>
                
                <Col md={3} className="text-center">
                  <div className="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                    <span className="text-success fw-bold display-6">2</span>
                  </div>
                  <h6 className="fw-bold">Create a Budget</h6>
                  <small className="text-muted">Plan your spending</small>
                </Col>
                
                <Col md={3} className="text-center">
                  <div className="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                    <span className="text-warning fw-bold display-6">3</span>
                  </div>
                  <h6 className="fw-bold">Build Emergency Fund</h6>
                  <small className="text-muted">3-6 months of expenses</small>
                </Col>
                
                <Col md={3} className="text-center">
                  <div className="bg-info-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                    <span className="text-info fw-bold display-6">4</span>
                  </div>
                  <h6 className="fw-bold">Start Investing</h6>
                  <small className="text-muted">Grow your wealth</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="ubuntu-font fw-bold mb-4">Learning Modules</h2>
        </Col>
      </Row>

      <Row className="g-4">
        {educationModules.map((module, index) => (
          <Col key={index} lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100 card-hover">
              <Card.Body>
                <div className="d-flex align-items-start mb-4">
                  <div className={`rounded-circle p-3 me-3 ${
                    index === 0 ? 'bg-info-subtle' :
                    index === 1 ? 'bg-success-subtle' :
                    index === 2 ? 'bg-warning-subtle' : 'bg-danger-subtle'
                  }`}>
                    <span className={`${
                      index === 0 ? 'text-info' :
                      index === 1 ? 'text-success' :
                      index === 2 ? 'text-warning' : 'text-danger'
                    }`} style={{ fontSize: '24px' }}>
                      {module.icon}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <Card.Title className="ubuntu-font fw-bold mb-1">
                      {module.title}
                    </Card.Title>
                    <p className="text-muted small mb-0">{module.description}</p>
                  </div>
                  <Badge bg="light" text="dark" className="px-3 py-2">
                    {module.topics.length} topics
                  </Badge>
                </div>

                <Accordion defaultActiveKey="0">
                  {module.topics.map((topic, topicIndex) => (
                    <Accordion.Item key={topicIndex} eventKey={topicIndex.toString()}>
                      <Accordion.Header>{topic.title}</Accordion.Header>
                      <Accordion.Body>
                        <div className="p-3">
                          <p className="mb-0">{topic.content}</p>
                          {topicIndex === module.topics.length - 1 && (
                            <div className="mt-3 pt-3 border-top">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => setActiveTopic(module.title)}
                              >
                                Learn More
                              </Button>
                            </div>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="ubuntu-font fw-bold mb-4">Interactive Tools</h3>
              
              <Row className="g-4">
                <Col md={4}>
                  <Card className="border-0 bg-light h-100">
                    <Card.Body className="text-center">
                      <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                        <span className="text-primary">💰</span>
                      </div>
                      <h5 className="fw-bold">Budget Calculator</h5>
                      <p className="text-muted small">Calculate your ideal budget based on income</p>
                      <Button variant="outline-primary" size="sm">
                        Try Calculator
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4}>
                  <Card className="border-0 bg-light h-100">
                    <Card.Body className="text-center">
                      <div className="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                        <span className="text-success">📈</span>
                      </div>
                      <h5 className="fw-bold">Investment Simulator</h5>
                      <p className="text-muted small">Simulate investment growth over time</p>
                      <Button variant="outline-success" size="sm">
                        Start Simulation
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4}>
                  <Card className="border-0 bg-light h-100">
                    <Card.Body className="text-center">
                      <div className="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                        <span className="text-warning">🎯</span>
                      </div>
                      <h5 className="fw-bold">Goal Planner</h5>
                      <p className="text-muted small">Plan and track your financial goals</p>
                      <Button variant="outline-warning" size="sm">
                        Plan Goals
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="ubuntu-font fw-bold mb-4">Frequently Asked Questions</h3>
              
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>When should I start investing?</Accordion.Header>
                  <Accordion.Body>
                    The best time to start investing was yesterday, the second best time is today. Start as soon as you have an emergency fund and no high-interest debt.
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How much should I save each month?</Accordion.Header>
                  <Accordion.Body>
                    Aim to save at least 20% of your income. If that's not possible, start with what you can and gradually increase your savings rate.
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>What is a TFSA and how does it work?</Accordion.Header>
                  <Accordion.Body>
                    A Tax-Free Savings Account allows you to invest up to R36,000 per year (lifetime limit R500,000) with all returns (interest, dividends, capital gains) being completely tax-free.
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>How do I create a realistic budget?</Accordion.Header>
                  <Accordion.Body>
                    Start by tracking all expenses for a month. Categorize them, then create a budget based on your actual spending patterns, making adjustments to align with your financial goals.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EducationSection;