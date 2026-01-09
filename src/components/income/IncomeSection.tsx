import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import IncomeForm from './IncomeForm';
import { mockIncomeStreams } from '../../data/mockData';
import type { IncomeStream } from '../../data/mockData';

const IncomeSection: React.FC = () => {
  const [incomeStreams, setIncomeStreams] = useState<IncomeStream[]>(mockIncomeStreams);
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState<IncomeStream | null>(null);

  const handleAddIncome = (income: IncomeStream) => {
    if (editingIncome) {
      setIncomeStreams(incomeStreams.map(inc => 
        inc.id === income.id ? income : inc
      ));
      setEditingIncome(null);
    } else {
      setIncomeStreams([...incomeStreams, { ...income, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (income: IncomeStream) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setIncomeStreams(incomeStreams.filter(inc => inc.id !== id));
  };

  const calculateTotalIncome = () => {
    return incomeStreams.reduce((total, inc) => total + inc.monthlyIncome, 0);
  };

  const calculateTotalExpenses = () => {
    return incomeStreams.reduce((total, inc) => total + inc.monthlyExpenses, 0);
  };

  const calculateNetIncome = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Income Streams
              </h1>
              <p className="text-muted">
                Track all your sources of income and associated expenses
              </p>
            </div>
            <Button 
              variant="primary" 
              className="btn-primary-custom d-flex align-items-center"
              onClick={() => setShowForm(true)}
            >
              <FiPlus className="me-2" />
              Add Income Stream
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                <FiDollarSign className="text-primary" size={30} />
              </div>
              <h3 className="fw-bold">R{calculateTotalIncome().toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Monthly Income</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                <FiBriefcase className="text-warning" size={30} />
              </div>
              <h3 className="fw-bold">R{calculateTotalExpenses().toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Monthly Expenses</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3 ${
                calculateNetIncome() >= 0 ? 'bg-success-subtle' : 'bg-danger-subtle'
              }`}>
                <FiDollarSign className={calculateNetIncome() >= 0 ? 'text-success' : 'text-danger'} size={30} />
              </div>
              <h3 className={`fw-bold ${calculateNetIncome() >= 0 ? 'text-success' : 'text-danger'}`}>
                R{calculateNetIncome().toLocaleString()}
              </h3>
              <p className="text-muted mb-0">Net Monthly Income</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {incomeStreams.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <div className="display-4 text-muted">💼</div>
                  </div>
                  <h4 className="mb-2">No Income Streams Added</h4>
                  <p className="text-muted mb-4">
                    Add your income sources to start tracking your finances
                  </p>
                  <Button 
                    variant="outline-primary"
                    onClick={() => setShowForm(true)}
                  >
                    Add Your First Income Stream
                  </Button>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Position</th>
                          <th>Start Date</th>
                          <th>Monthly Income</th>
                          <th>Monthly Expenses</th>
                          <th>Net Income</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomeStreams.map((income) => {
                          const netIncome = income.monthlyIncome - income.monthlyExpenses;
                          return (
                            <tr key={income.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center me-3" 
                                       style={{ width: '40px', height: '40px' }}>
                                    <span className="text-primary fw-bold">
                                      {income.company.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="fw-medium">{income.company}</div>
                                    <small className="text-muted">{income.description}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{income.position}</td>
                              <td>{new Date(income.startDate).toLocaleDateString()}</td>
                              <td>
                                <Badge bg="success" className="px-3 py-2">
                                  R{income.monthlyIncome.toLocaleString()}
                                </Badge>
                              </td>
                              <td>
                                <Badge bg="warning" className="px-3 py-2">
                                  R{income.monthlyExpenses.toLocaleString()}
                                </Badge>
                              </td>
                              <td>
                                <Badge 
                                  bg={netIncome >= 0 ? "info" : "danger"} 
                                  className="px-3 py-2"
                                >
                                  R{netIncome.toLocaleString()}
                                </Badge>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEdit(income)}
                                  >
                                    <FiEdit2 />
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(income.id)}
                                  >
                                    <FiTrash2 />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>

                  <div className="mt-4 pt-3 border-top">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Total Income:</span>
                          <span className="fw-bold">R{calculateTotalIncome().toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Total Expenses:</span>
                          <span className="fw-bold">R{calculateTotalExpenses().toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Overall Net Income:</span>
                          <span className={`fw-bold ${calculateNetIncome() >= 0 ? 'text-success' : 'text-danger'}`}>
                            R{calculateNetIncome().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showForm && (
        <IncomeForm
          income={editingIncome}
          onSubmit={handleAddIncome}
          onClose={() => {
            setShowForm(false);
            setEditingIncome(null);
          }}
        />
      )}
    </Container>
  );
};

export default IncomeSection;