import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { FiBook, FiTrendingUp, FiDollarSign, FiPercent, FiTarget } from 'react-icons/fi';

const EducationSection: React.FC = () => {
  const moduleColors = [
    { bg: '#e0f7f4', color: '#17a2b8' },
    { bg: '#d4edda', color: '#51cf66' },
    { bg: '#fff3cd', color: '#ffc107' },
    { bg: '#f8d7da', color: '#ff6b6b' },
  ];

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

  const quickSteps = [
    { number: '1', label: 'Track Income & Expenses', sub: 'Know where your money goes', color: '#17a2b8', bg: '#e0f7f4' },
    { number: '2', label: 'Create a Budget', sub: 'Plan your spending', color: '#51cf66', bg: '#d4edda' },
    { number: '3', label: 'Build Emergency Fund', sub: '3-6 months of expenses', color: '#ffc107', bg: '#fff3cd' },
    { number: '4', label: 'Start Investing', sub: 'Grow your wealth', color: '#17a2b8', bg: '#e0f7f4' },
  ];

  const interactiveTools = [
    { icon: <FiDollarSign size={24} />, title: 'Budget Calculator', description: 'Calculate your ideal budget based on income', color: '#17a2b8', bg: '#e0f7f4' },
    { icon: <FiTrendingUp size={24} />, title: 'Investment Simulator', description: 'Simulate investment growth over time', color: '#51cf66', bg: '#d4edda' },
    { icon: <FiTarget size={24} />, title: 'Goal Planner', description: 'Plan and track your financial goals', color: '#ffc107', bg: '#fff3cd' },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="text-center mb-5" style={{ paddingLeft: '40px', padding: '25px' }}>
            <div className="mb-3" style={{ color: '#17a2b8', fontSize: '3rem' }}>
              <FiBook />
            </div>
            <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
              Financial Education Hub
            </h1>
            <p className="lead text-muted roboto-font mx-auto" style={{ maxWidth: '600px' }}>
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
                <p className="text-muted roboto-font">
                  Follow these steps to build your financial literacy foundation
                </p>
              </div>

              <Row className="g-4">
                {quickSteps.map((step) => (
                  <Col key={step.number} md={3} className="text-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3"
                      style={{ backgroundColor: step.bg, width: '80px', height: '80px' }}
                    >
                      <span className="ubuntu-font fw-bold fs-4" style={{ color: step.color }}>
                        {step.number}
                      </span>
                    </div>
                    <h6 className="ubuntu-font fw-bold">{step.label}</h6>
                    <small className="text-muted roboto-font">{step.sub}</small>
                  </Col>
                ))}
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
                  <div
                    className="rounded-circle p-3 me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      backgroundColor: moduleColors[index].bg,
                      width: '52px',
                      height: '52px',
                      color: moduleColors[index].color,
                      fontSize: '22px',
                    }}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-grow-1">
                    <Card.Title className="ubuntu-font fw-bold mb-1">{module.title}</Card.Title>
                    <p className="text-muted small roboto-font mb-0">{module.description}</p>
                  </div>
                  <span
                    className="category-badge roboto-font flex-shrink-0"
                    style={{
                      backgroundColor: '#e0f7f4',
                      color: '#17a2b8',
                      border: '1px solid #b2ebf2',
                    }}
                  >
                    {module.topics.length} topics
                  </span>
                </div>

                <Accordion defaultActiveKey="0">
                  {module.topics.map((topic, topicIndex) => (
                    <Accordion.Item key={topicIndex} eventKey={topicIndex.toString()}>
                      <Accordion.Header>
                        <span className="roboto-font fw-medium">{topic.title}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="roboto-font mb-0">{topic.content}</p>
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
                {interactiveTools.map((tool, index) => (
                  <Col key={index} md={4}>
                    <Card className="border-0 h-100" style={{ backgroundColor: '#f8f9fa' }}>
                      <Card.Body className="text-center">
                        <div
                          className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                          style={{ backgroundColor: tool.bg, color: tool.color, width: '56px', height: '56px' }}
                        >
                          {tool.icon}
                        </div>
                        <h5 className="ubuntu-font fw-bold">{tool.title}</h5>
                        <p className="text-muted roboto-font small">{tool.description}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
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
                  <Accordion.Header>
                    <span className="roboto-font fw-medium">When should I start investing?</span>
                  </Accordion.Header>
                  <Accordion.Body className="roboto-font">
                    The best time to start investing was yesterday, the second best time is today. Start as soon as you have an emergency fund and no high-interest debt.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <span className="roboto-font fw-medium">How much should I save each month?</span>
                  </Accordion.Header>
                  <Accordion.Body className="roboto-font">
                    Aim to save at least 20% of your income. If that's not possible, start with what you can and gradually increase your savings rate.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <span className="roboto-font fw-medium">What is a TFSA and how does it work?</span>
                  </Accordion.Header>
                  <Accordion.Body className="roboto-font">
                    A Tax-Free Savings Account allows you to invest up to R36,000 per year (lifetime limit R500,000) with all returns (interest, dividends, capital gains) being completely tax-free.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <span className="roboto-font fw-medium">How do I create a realistic budget?</span>
                  </Accordion.Header>
                  <Accordion.Body className="roboto-font">
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