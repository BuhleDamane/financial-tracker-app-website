import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiTrendingUp } from 'react-icons/fi';
import InvestmentForm from './InvestmentForm';
import InvestmentChart from './InvestmentChart';
import type { Investment } from '../../data/mockData';

const InvestmentSection: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const investmentTypes = [
    { key: 'stocks', label: 'Stocks' },
    { key: 'crypto', label: 'Crypto' },
    { key: 'pension', label: 'Pension Fund' },
    { key: 'retirement', label: 'Retirement Annuity' },
    { key: 'other', label: 'Other' },
  ];

  const termColors: Record<string, string> = {
    long: '#51cf66',
    intermediate: '#ffc107',
    short: '#17a2b8',
  };

  const handleAddInvestment = (investment: Investment) => {
    if (editingInvestment) {
      setInvestments(investments.map(inv =>
        inv.id === investment.id ? investment : inv
      ));
      setEditingInvestment(null);
    } else {
      setInvestments([...investments, { ...investment, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const getInvestmentsByType = (type: string) => {
    return investments.filter(inv => inv.type === type);
  };

  const calculateTotalByType = (type: string) => {
    return investments
      .filter(inv => inv.type === type)
      .reduce((total, inv) => total + inv.amount, 0);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-wrap justify-content-between align-items-start align-items-sm-center gap-3"
            style={{ paddingLeft: '40px' }}
          >
            <div>
              <h1 className="ubuntu-font fw-bold mb-1" style={{ color: '#2c3e50' }}>
                Investment Portfolio
              </h1>
              <p className="text-muted roboto-font mb-0">
                Track and manage all your investments in one place
              </p>
            </div>
            <Button
              className="btn-custom btn-primary-custom text-white d-flex align-items-center roboto-font flex-shrink-0"
              onClick={() => setShowForm(true)}
            >
              <FiPlus className="me-2" />
              Add New Investment
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <InvestmentChart investments={investments} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Tabs defaultActiveKey="stocks" className="mb-4">
                {investmentTypes.map((type) => (
                  <Tab
                    key={type.key}
                    eventKey={type.key}
                    title={
                      <div className="d-flex align-items-center roboto-font">
                        <span>{type.label}</span>
                        <span
                          className="ms-2 px-2 py-1 rounded-pill roboto-font"
                          style={{
                            backgroundColor: '#e0f7f4',
                            color: '#17a2b8',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          R{calculateTotalByType(type.key).toLocaleString('en-ZA')}
                        </span>
                      </div>
                    }
                  >
                    <div className="mt-3">
                      {getInvestmentsByType(type.key).length === 0 ? (
                        <div className="text-center py-5">
                          <FiTrendingUp size={48} className="mb-3" style={{ color: '#17a2b8', opacity: 0.4 }} />
                          <h5 className="ubuntu-font fw-bold mb-2">No {type.label} Investments Yet</h5>
                          <p className="text-muted roboto-font mb-4">
                            You haven't added any {type.label.toLowerCase()} investments.
                          </p>
                          <Button
                            className="btn-custom roboto-font"
                            style={{
                              border: '1.5px solid #17a2b8',
                              color: '#17a2b8',
                              backgroundColor: 'transparent',
                            }}
                            onClick={() => setShowForm(true)}
                          >
                            Add Your First {type.label} Investment
                          </Button>
                        </div>
                      ) : (
                        <Row>
                          {getInvestmentsByType(type.key).map((investment) => (
                            <Col key={investment.id} lg={6} className="mb-3">
                              <Card className="card-hover h-100 border-0 shadow-sm">
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                      <h5 className="ubuntu-font fw-bold mb-1" style={{ color: '#2c3e50' }}>
                                        {investment.company}
                                      </h5>
                                      <p className="text-muted small roboto-font mb-2">
                                        {investment.stockName} • {investment.investmentSite}
                                      </p>
                                    </div>
                                    <span
                                      className="category-badge text-uppercase"
                                      style={{
                                        backgroundColor: investment.isTFSA ? '#d4edda' : '#e0f7f4',
                                        color: investment.isTFSA ? '#155724' : '#17a2b8',
                                        border: `1px solid ${investment.isTFSA ? '#c3e6cb' : '#b2ebf2'}`,
                                      }}
                                    >
                                      {investment.isTFSA ? 'TFSA' : investment.type}
                                    </span>
                                  </div>

                                  <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                      <span className="text-muted roboto-font">Amount Invested</span>
                                      <span className="fw-bold roboto-font">
                                        R{investment.amount.toLocaleString('en-ZA')}
                                      </span>
                                    </div>
                                    {investment.numberOfStocks ? (
                                      <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted roboto-font">Number of Stocks</span>
                                        <span className="fw-bold roboto-font">{investment.numberOfStocks}</span>
                                      </div>
                                    ) : null}
                                    <div className="d-flex justify-content-between mb-1">
                                      <span className="text-muted roboto-font">Date Invested</span>
                                      <span className="roboto-font">
                                        {new Date(investment.dateInvested).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <span className="text-muted roboto-font">Investment Term</span>
                                      <span
                                        className="category-badge text-capitalize"
                                        style={{
                                          backgroundColor: `${termColors[investment.investmentTerm]}22`,
                                          color: termColors[investment.investmentTerm],
                                          border: `1px solid ${termColors[investment.investmentTerm]}55`,
                                        }}
                                      >
                                        {investment.investmentTerm}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex justify-content-end gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleEdit(investment)}
                                      style={{
                                        border: '1.5px solid #17a2b8',
                                        color: '#17a2b8',
                                        backgroundColor: 'transparent',
                                        borderRadius: '8px',
                                      }}
                                    >
                                      <FiEdit2 />
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => handleDelete(investment.id)}
                                      style={{
                                        border: '1.5px solid #ff6b6b',
                                        color: '#ff6b6b',
                                        backgroundColor: 'transparent',
                                        borderRadius: '8px',
                                      }}
                                    >
                                      <FiTrash2 />
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showForm && (
        <InvestmentForm
          investment={editingInvestment}
          onSubmit={handleAddInvestment}
          onClose={() => {
            setShowForm(false);
            setEditingInvestment(null);
          }}
        />
      )}
    </Container>
  );
};

export default InvestmentSection;