import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Badge } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import InvestmentForm from './InvestmentForm';
import InvestmentChart from './InvestmentChart';
import { mockInvestments } from '../../data/mockData';
import type { Investment } from '../../data/mockData';

const InvestmentSection: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [showForm, setShowForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const investmentTypes = [
    { key: 'stocks', label: 'Stocks', color: 'primary' },
    { key: 'crypto', label: 'Crypto', color: 'warning' },
    { key: 'pension', label: 'Pension Fund', color: 'info' },
    { key: 'retirement', label: 'Retirement Annuity', color: 'success' },
    { key: 'other', label: 'Other', color: 'secondary' },
  ];

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
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Investment Portfolio
              </h1>
              <p className="text-muted">
                Track and manage all your investments in one place
              </p>
            </div>
            <Button 
              variant="primary" 
              className="btn-primary-custom d-flex align-items-center"
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
                      <div className="d-flex align-items-center">
                        <span>{type.label}</span>
                        <Badge bg={type.color} className="ms-2">
                          R{calculateTotalByType(type.key).toLocaleString()}
                        </Badge>
                      </div>
                    }
                  >
                    <div className="mt-3">
                      {getInvestmentsByType(type.key).length === 0 ? (
                        <div className="text-center py-5">
                          <div className="mb-3">
                            <div className="display-4 text-muted">📈</div>
                          </div>
                          <h4 className="mb-2">No {type.label} Investments Yet</h4>
                          <p className="text-muted mb-4">
                            You haven't added any {type.label.toLowerCase()} investments.
                          </p>
                          <Button 
                            variant="outline-primary"
                            onClick={() => {
                              setShowForm(true);
                            }}
                          >
                            Add Your First {type.label} Investment
                          </Button>
                        </div>
                      ) : (
                        <Row>
                          {getInvestmentsByType(type.key).map((investment) => (
                            <Col key={investment.id} lg={6} className="mb-3">
                              <Card className="card-hover h-100">
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                      <h5 className="fw-bold mb-1">{investment.company}</h5>
                                      <p className="text-muted small mb-2">
                                        {investment.stockName} • {investment.investmentSite}
                                      </p>
                                    </div>
                                    <Badge 
                                      bg={type.color} 
                                      className={`text-uppercase ${investment.isTFSA ? 'bg-success' : ''}`}
                                    >
                                      {investment.isTFSA ? 'TFSA' : investment.type}
                                    </Badge>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                      <span className="text-muted">Amount Invested</span>
                                      <span className="fw-bold">
                                        R{investment.amount.toLocaleString()}
                                      </span>
                                    </div>
                                    {investment.numberOfStocks && (
                                      <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted">Number of Stocks</span>
                                        <span className="fw-bold">{investment.numberOfStocks}</span>
                                      </div>
                                    )}
                                    <div className="d-flex justify-content-between mb-1">
                                      <span className="text-muted">Date Invested</span>
                                      <span>{new Date(investment.dateInvested).toLocaleDateString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <span className="text-muted">Investment Term</span>
                                      <span className={`badge bg-${investment.investmentTerm === 'long' ? 'success' : investment.investmentTerm === 'intermediate' ? 'warning' : 'info'}`}>
                                        {investment.investmentTerm}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex justify-content-end gap-2">
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      onClick={() => handleEdit(investment)}
                                    >
                                      <FiEdit2 />
                                    </Button>
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() => handleDelete(investment.id)}
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