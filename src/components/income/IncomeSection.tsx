import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import IncomeForm from './IncomeForm';
import type { IncomeStream } from '../../data/mockData';

const IncomeSection: React.FC = () => {
  const [incomeStreams, setIncomeStreams] = useState<IncomeStream[]>([]);
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

  const calculateTotalIncome = () => incomeStreams.reduce((total, inc) => total + inc.monthlyIncome, 0);
  const calculateTotalExpenses = () => incomeStreams.reduce((total, inc) => total + inc.monthlyExpenses, 0);
  const calculateNetIncome = () => calculateTotalIncome() - calculateTotalExpenses();

  const netIncome = calculateNetIncome();

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ paddingLeft: '40px', padding: '45px' }}>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Income Streams
              </h1>
              <p className="text-muted roboto-font">
                Track all your sources of income and associated expenses
              </p>
            </div>
            <Button
              className="btn-custom btn-primary-custom text-white d-flex align-items-center roboto-font"
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
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                style={{ backgroundColor: '#e0f7f4', color: '#17a2b8', width: '64px', height: '64px' }}
              >
                <FiDollarSign size={30} />
              </div>
              <h3 className="ubuntu-font fw-bold">R{calculateTotalIncome().toLocaleString()}</h3>
              <p className="text-muted roboto-font mb-0">Total Monthly Income</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                style={{ backgroundColor: '#fff3cd', color: '#ffc107', width: '64px', height: '64px' }}
              >
                <FiBriefcase size={30} />
              </div>
              <h3 className="ubuntu-font fw-bold">R{calculateTotalExpenses().toLocaleString()}</h3>
              <p className="text-muted roboto-font mb-0">Total Monthly Expenses</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                style={{
                  backgroundColor: netIncome >= 0 ? '#d4edda' : '#f8d7da',
                  color: netIncome >= 0 ? '#51cf66' : '#ff6b6b',
                  width: '64px',
                  height: '64px',
                }}
              >
                <FiDollarSign size={30} />
              </div>
              <h3
                className="ubuntu-font fw-bold"
                style={{ color: netIncome >= 0 ? '#51cf66' : '#ff6b6b' }}
              >
                R{netIncome.toLocaleString()}
              </h3>
              <p className="text-muted roboto-font mb-0">Net Monthly Income</p>
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
                  <FiBriefcase size={48} className="mb-3" style={{ color: '#17a2b8', opacity: 0.4 }} />
                  <h5 className="ubuntu-font fw-bold mb-2">No Income Streams Added</h5>
                  <p className="text-muted roboto-font mb-4">
                    Add your income sources to start tracking your finances
                  </p>
                  <Button
                    className="btn-custom roboto-font"
                    style={{ border: '1.5px solid #17a2b8', color: '#17a2b8', backgroundColor: 'transparent' }}
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
                          <th className="roboto-font">Company</th>
                          <th className="roboto-font">Position</th>
                          <th className="roboto-font">Start Date</th>
                          <th className="roboto-font">Monthly Income</th>
                          <th className="roboto-font">Monthly Expenses</th>
                          <th className="roboto-font">Net Income</th>
                          <th className="roboto-font">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomeStreams.map((income) => {
                          const net = income.monthlyIncome - income.monthlyExpenses;
                          return (
                            <tr key={income.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                    style={{ width: '40px', height: '40px', backgroundColor: '#e0f7f4' }}
                                  >
                                    <span className="ubuntu-font fw-bold" style={{ color: '#17a2b8' }}>
                                      {income.company.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="roboto-font fw-medium">{income.company}</div>
                                    <small className="text-muted roboto-font">{income.description}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="roboto-font">{income.position}</td>
                              <td className="roboto-font">{new Date(income.startDate).toLocaleDateString()}</td>
                              <td>
                                <span
                                  className="category-badge roboto-font"
                                  style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }}
                                >
                                  R{income.monthlyIncome.toLocaleString()}
                                </span>
                              </td>
                              <td>
                                <span
                                  className="category-badge roboto-font"
                                  style={{ backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' }}
                                >
                                  R{income.monthlyExpenses.toLocaleString()}
                                </span>
                              </td>
                              <td>
                                <span
                                  className="category-badge roboto-font"
                                  style={{
                                    backgroundColor: net >= 0 ? '#e0f7f4' : '#f8d7da',
                                    color: net >= 0 ? '#17a2b8' : '#721c24',
                                    border: `1px solid ${net >= 0 ? '#b2ebf2' : '#f5c6cb'}`,
                                  }}
                                >
                                  R{net.toLocaleString()}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleEdit(income)}
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
                                    onClick={() => handleDelete(income.id)}
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
                          <span className="text-muted roboto-font">Total Income:</span>
                          <span className="roboto-font fw-bold">R{calculateTotalIncome().toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted roboto-font">Total Expenses:</span>
                          <span className="roboto-font fw-bold">R{calculateTotalExpenses().toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted roboto-font">Overall Net Income:</span>
                          <span
                            className="roboto-font fw-bold"
                            style={{ color: netIncome >= 0 ? '#51cf66' : '#ff6b6b' }}
                          >
                            R{netIncome.toLocaleString()}
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