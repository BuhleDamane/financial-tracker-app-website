import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge } from 'react-bootstrap';
import { FiPlus, FiTrash2, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
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
      case 'green': return <FiCheckCircle className="text-success" />;
      case 'orange': return <FiAlertCircle className="text-warning" />;
      case 'red': return <FiAlertCircle className="text-danger" />;
    }
  };

  const getStatusText = (status: 'green' | 'orange' | 'red') => {
    switch (status) {
      case 'green': return 'Within Budget';
      case 'orange': return 'Approaching Limit';
      case 'red': return 'Over Budget';
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Monthly Budget
              </h1>
              <p className="text-muted">
                Track your expenses and stay within your budget limits
              </p>
            </div>
            <Button 
              variant="primary" 
              className="btn-primary-custom d-flex align-items-center"
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
        <Card className="border-0 shadow-sm mb-4 form-container">
          <Card.Body>
            <h5 className="ubuntu-font fw-bold mb-4">Add New Budget Item</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Rent, Food, Entertainment"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={newItem.type}
                    onChange={(e) => setNewItem({...newItem, type: e.target.value as 'non-negotiable' | 'negotiable'})}
                  >
                    <option value="non-negotiable">Non-Negotiable (Rent, Food, etc.)</option>
                    <option value="negotiable">Negotiable (Entertainment, Shopping, etc.)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Budgeted Amount (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({...newItem, amount: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Allocated/Spent Amount (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newItem.allocatedAmount}
                    onChange={(e) => setNewItem({...newItem, allocatedAmount: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button variant="outline-secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAddItem}>
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
                <Badge bg="primary" className="px-3 py-2">
                  {budgetItems.length} Items
                </Badge>
              </div>

              {budgetItems.length === 0 ? (
                <div className="text-center py-5">
                  <div className="display-4 text-muted mb-3">💰</div>
                  <h4 className="mb-2">No Budget Items Added</h4>
                  <p className="text-muted mb-4">Start by adding your budget categories</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Budgeted</th>
                        <th>Allocated</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetItems.map((item) => {
                        const percentage = (item.allocatedAmount / item.amount) * 100;
                        return (
                          <tr key={item.id}>
                            <td>
                              <div className="fw-medium">{item.category}</div>
                            </td>
                            <td>
                              <Badge bg={item.type === 'non-negotiable' ? 'info' : 'secondary'}>
                                {item.type === 'non-negotiable' ? 'Essential' : 'Discretionary'}
                              </Badge>
                            </td>
                            <td>
                              <div className="fw-bold">R{item.amount.toLocaleString()}</div>
                            </td>
                            <td>
                              <div className="fw-bold">R{item.allocatedAmount.toLocaleString()}</div>
                              <small className="text-muted">
                                {percentage.toFixed(1)}% of budget
                              </small>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {getStatusIcon(item.status)}
                                <span className="ms-2">{getStatusText(item.status)}</span>
                              </div>
                            </td>
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(item.id)}
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
                  <span className="text-muted">Total Budget</span>
                  <span className="fw-bold">R{totals.budgeted.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Allocated</span>
                  <span className="fw-bold">R{totals.allocated.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Budget Remaining</span>
                  <span className={`fw-bold ${totals.remaining >= 0 ? 'text-success' : 'text-danger'}`}>
                    R{totals.remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Budget Usage</span>
                  <span className="fw-bold">{totals.percentageUsed.toFixed(1)}%</span>
                </div>
                <ProgressBar 
                  now={totals.percentageUsed} 
                  variant={totals.percentageUsed <= 100 ? 'success' : totals.percentageUsed <= 120 ? 'warning' : 'danger'}
                  className="mb-3"
                  style={{ height: '10px' }}
                />
                <small className="text-muted d-block">
                  {totals.percentageUsed <= 100 ? '✅ Within budget' : 
                   totals.percentageUsed <= 120 ? '⚠️ Approaching limit' : 
                   '❌ Over budget - Review your spending'}
                </small>
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-bold mb-3">Budget Breakdown</h6>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Non-Negotiable</span>
                    <span>R{totals.nonNegotiable.toLocaleString()}</span>
                  </div>
                  <ProgressBar 
                    now={(totals.nonNegotiable / totals.budgeted) * 100} 
                    variant="info"
                  />
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Negotiable</span>
                    <span>R{totals.negotiable.toLocaleString()}</span>
                  </div>
                  <ProgressBar 
                    now={(totals.negotiable / totals.budgeted) * 100} 
                    variant="secondary"
                  />
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