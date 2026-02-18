import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { FiPlus, FiTrash2, FiAlertCircle, FiCheckCircle, FiDollarSign } from 'react-icons/fi';
import BudgetChart from './BudgetChart';
import { mockBudgetItems } from '../../data/mockData';
import type { BudgetItem } from '../../data/mockData';

const BudgetSection: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(mockBudgetItems);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState<Omit<BudgetItem, 'id'>>({
    category: '',
    type: 'non-negotiable',
    amount: 0,
    allocatedAmount: 0,
    status: 'green'
  });

  const handleAddItem = () => {
    if (!newItem.category || newItem.amount <= 0) return;

    const status = calculateStatus(newItem.allocatedAmount, newItem.amount);
    const budgetItem: BudgetItem = {
      ...newItem,
      id: Date.now().toString(),
      status
    };

    setBudgetItems([...budgetItems, budgetItem]);
    setNewItem({
      category: '',
      type: 'non-negotiable',
      amount: 0,
      allocatedAmount: 0,
      status: 'green'
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const calculateStatus = (allocated: number, actual: number): 'green' | 'orange' | 'red' => {
    const percentage = (allocated / actual) * 100;
    if (percentage <= 100) return 'green';
    if (percentage <= 120) return 'orange';
    return 'red';
  };

  const calculateTotals = () => {
    const nonNegotiable = budgetItems
      .filter(item => item.type === 'non-negotiable')
      .reduce((sum, item) => sum + item.amount, 0);

    const negotiable = budgetItems
      .filter(item => item.type === 'negotiable')
      .reduce((sum, item) => sum + item.amount, 0);

    const allocated = budgetItems.reduce((sum, item) => sum + item.allocatedAmount, 0);
    const budgeted = budgetItems.reduce((sum, item) => sum + item.amount, 0);

    return {
      nonNegotiable,
      negotiable,
      allocated,
      budgeted,
      remaining: budgeted - allocated,
      percentageUsed: budgeted > 0 ? (allocated / budgeted) * 100 : 0
    };
  };

  const totals = calculateTotals();

  const getStatusIcon = (status: 'green' | 'orange' | 'red') => {
    switch (status) {
      case 'green': return <FiCheckCircle style={{ color: '#51cf66' }} />;
      case 'orange': return <FiAlertCircle style={{ color: '#ffc107' }} />;
      case 'red': return <FiAlertCircle style={{ color: '#ff6b6b' }} />;
    }
  };

  const getStatusText = (status: 'green' | 'orange' | 'red') => {
    switch (status) {
      case 'green': return 'Within Budget';
      case 'orange': return 'Approaching Limit';
      case 'red': return 'Over Budget';
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage <= 100) return '#51cf66';
    if (percentage <= 120) return '#ffc107';
    return '#ff6b6b';
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ paddingLeft: '40px' }}>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Monthly Budget
              </h1>
              <p className="text-muted roboto-font">
                Track your expenses and stay within your budget limits
              </p>
            </div>
            <Button
              className="btn-custom btn-primary-custom text-white d-flex align-items-center roboto-font"
              onClick={() => setShowForm(!showForm)}
            >
              <FiPlus className="me-2" />
              {showForm ? 'Cancel' : 'Add Budget Item'}
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <BudgetChart budgetItems={budgetItems} />
        </Col>
      </Row>

      {showForm && (
        <Card className="border-0 shadow-sm mb-4 form-container settings-form">
          <Card.Body>
            <h5 className="ubuntu-font fw-bold mb-4" style={{ color: '#2c3e50' }}>Add New Budget Item</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Type</Form.Label>
                  <Form.Select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'non-negotiable' | 'negotiable' })}
                  >
                    <option value="non-negotiable">Non-Negotiable (Rent, Food, etc.)</option>
                    <option value="negotiable">Negotiable (Entertainment, Shopping, etc.)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Budgeted Amount (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Allocated/Spent Amount (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newItem.allocatedAmount}
                    onChange={(e) => setNewItem({ ...newItem, allocatedAmount: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button
                    className="btn-custom roboto-font"
                    style={{ border: '1.5px solid #6c757d', color: '#6c757d', backgroundColor: 'transparent' }}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn-custom btn-primary-custom text-white roboto-font"
                    onClick={handleAddItem}
                  >
                    Add Item
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title className="ubuntu-font fw-bold mb-0">Budget Items</Card.Title>
                <span
                  className="category-badge roboto-font"
                  style={{
                    backgroundColor: '#e0f7f4',
                    color: '#17a2b8',
                    border: '1px solid #b2ebf2',
                  }}
                >
                  {budgetItems.length} Items
                </span>
              </div>

              {budgetItems.length === 0 ? (
                <div className="text-center py-5">
                  <FiDollarSign size={48} className="mb-3" style={{ color: '#17a2b8', opacity: 0.4 }} />
                  <h5 className="ubuntu-font fw-bold mb-2">No Budget Items Added</h5>
                  <p className="text-muted roboto-font mb-4">Start by adding your budget categories</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="roboto-font">Category</th>
                        <th className="roboto-font">Type</th>
                        <th className="roboto-font">Budgeted</th>
                        <th className="roboto-font">Allocated</th>
                        <th className="roboto-font">Status</th>
                        <th className="roboto-font">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetItems.map((item) => {
                        const percentage = (item.allocatedAmount / item.amount) * 100;
                        return (
                          <tr key={item.id}>
                            <td>
                              <div className="roboto-font fw-medium">{item.category}</div>
                            </td>
                            <td>
                              <span
                                className="category-badge roboto-font"
                                style={
                                  item.type === 'non-negotiable'
                                    ? { backgroundColor: '#e0f7f4', color: '#17a2b8', border: '1px solid #b2ebf2' }
                                    : { backgroundColor: '#f8f9fa', color: '#6c757d', border: '1px solid #dee2e6' }
                                }
                              >
                                {item.type === 'non-negotiable' ? 'Essential' : 'Discretionary'}
                              </span>
                            </td>
                            <td>
                              <div className="roboto-font fw-bold">R{item.amount.toLocaleString()}</div>
                            </td>
                            <td>
                              <div className="roboto-font fw-bold">R{item.allocatedAmount.toLocaleString()}</div>
                              <small className="text-muted roboto-font">
                                {percentage.toFixed(1)}% of budget
                              </small>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {getStatusIcon(item.status)}
                                <span className="ms-2 roboto-font">{getStatusText(item.status)}</span>
                              </div>
                            </td>
                            <td>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                                style={{
                                  border: '1.5px solid #ff6b6b',
                                  color: '#ff6b6b',
                                  backgroundColor: 'transparent',
                                  borderRadius: '8px',
                                }}
                              >
                                <FiTrash2 />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">Budget Summary</Card.Title>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Total Budget</span>
                  <span className="roboto-font fw-bold">R{totals.budgeted.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Total Allocated</span>
                  <span className="roboto-font fw-bold">R{totals.allocated.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Budget Remaining</span>
                  <span
                    className="roboto-font fw-bold"
                    style={{ color: totals.remaining >= 0 ? '#51cf66' : '#ff6b6b' }}
                  >
                    R{totals.remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Budget Usage</span>
                  <span className="roboto-font fw-bold">{totals.percentageUsed.toFixed(1)}%</span>
                </div>
                <div className="progress mb-3" style={{ height: '10px', borderRadius: '5px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${Math.min(totals.percentageUsed, 100)}%`,
                      backgroundColor: getUsageColor(totals.percentageUsed),
                      borderRadius: '5px',
                    }}
                  />
                </div>
                <small className="roboto-font" style={{ color: getUsageColor(totals.percentageUsed) }}>
                  {totals.percentageUsed <= 100
                    ? 'Within budget'
                    : totals.percentageUsed <= 120
                    ? 'Approaching limit'
                    : 'Over budget — review your spending'}
                </small>
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="ubuntu-font fw-bold mb-3">Budget Breakdown</h6>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="roboto-font">Non-Negotiable</span>
                    <span className="roboto-font fw-medium">R{totals.nonNegotiable.toLocaleString()}</span>
                  </div>
                  <ProgressBar
                    now={(totals.nonNegotiable / totals.budgeted) * 100}
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(totals.nonNegotiable / totals.budgeted) * 100}%`,
                        backgroundColor: '#17a2b8',
                      }}
                    />
                  </ProgressBar>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="roboto-font">Negotiable</span>
                    <span className="roboto-font fw-medium">R{totals.negotiable.toLocaleString()}</span>
                  </div>
                  <ProgressBar
                    now={(totals.negotiable / totals.budgeted) * 100}
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(totals.negotiable / totals.budgeted) * 100}%`,
                        backgroundColor: '#2c3e50',
                      }}
                    />
                  </ProgressBar>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetSection;