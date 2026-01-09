import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge } from 'react-bootstrap';
import { FiPlus, FiTarget, FiCalendar, FiTrendingUp, FiEdit2, FiTrash2 } from 'react-icons/fi';
import GoalProgress from './GoalProgress';
import { mockGoals } from '../../data/mockData';
import type { Goal } from '../../data/mockData';

const GoalsSection: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id' | 'progress'>>({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    category: 'savings'
  });

  const handleAddGoal = () => {
    if (!newGoal.title || newGoal.targetAmount <= 0) return;
    
    const progress = (newGoal.currentAmount / newGoal.targetAmount) * 100;
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      progress
    };
    
    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: '',
      category: 'savings'
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleUpdateProgress = (id: string, newAmount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const currentAmount = Math.min(newAmount, goal.targetAmount);
        const progress = (currentAmount / goal.targetAmount) * 100;
        return { ...goal, currentAmount, progress };
      }
      return goal;
    }));
  };

  const calculateTotalGoals = () => {
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const completedGoals = goals.filter(goal => goal.progress >= 100).length;
    
    return {
      totalTarget,
      totalCurrent,
      overallProgress: totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0,
      completedGoals,
      inProgressGoals: goals.length - completedGoals
    };
  };

  const totals = calculateTotalGoals();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'savings': return 'success';
      case 'debt': return 'warning';
      case 'asset': return 'info';
      case 'investment': return 'primary';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings': return '💰';
      case 'debt': return '💳';
      case 'asset': return '🚗';
      case 'investment': return '📈';
      default: return '🎯';
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Goals & Progress
              </h1>
              <p className="text-muted">
                Set financial goals and track your progress towards achieving them
              </p>
            </div>
            <Button 
              variant="primary" 
              className="btn-primary-custom d-flex align-items-center"
              onClick={() => setShowForm(!showForm)}
            >
              <FiPlus className="me-2" />
              {showForm ? 'Cancel' : 'Add New Goal'}
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                <FiTarget className="text-primary" size={30} />
              </div>
              <h3 className="fw-bold">{goals.length}</h3>
              <p className="text-muted mb-0">Total Goals</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                <FiTrendingUp className="text-success" size={30} />
              </div>
              <h3 className="fw-bold">{totals.completedGoals}</h3>
              <p className="text-muted mb-0">Completed</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-info-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                <FiCalendar className="text-info" size={30} />
              </div>
              <h3 className="fw-bold">{totals.inProgressGoals}</h3>
              <p className="text-muted mb-0">In Progress</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                <span className="text-warning" style={{ fontSize: '30px' }}>🎯</span>
              </div>
              <h3 className="fw-bold">{totals.overallProgress.toFixed(1)}%</h3>
              <p className="text-muted mb-0">Overall Progress</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showForm && (
        <Card className="border-0 shadow-sm mb-4 form-container">
          <Card.Body>
            <h5 className="ubuntu-font fw-bold mb-4">Add New Financial Goal</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Goal Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Emergency Fund, New Car, Student Loan"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  >
                    <option value="savings">Savings</option>
                    <option value="debt">Debt Repayment</option>
                    <option value="asset">Asset Purchase</option>
                    <option value="investment">Investment</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Target Amount (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Current Amount Saved (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Preview</Form.Label>
                  <div className="p-3 bg-light rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Progress:</span>
                      <span>
                        {newGoal.targetAmount > 0 
                          ? `${((newGoal.currentAmount / newGoal.targetAmount) * 100).toFixed(1)}%`
                          : '0%'}
                      </span>
                    </div>
                    <ProgressBar 
                      now={newGoal.targetAmount > 0 ? (newGoal.currentAmount / newGoal.targetAmount) * 100 : 0} 
                      variant="success"
                      style={{ height: '8px' }}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={12}>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button variant="outline-secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAddGoal}>
                    Add Goal
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title className="ubuntu-font fw-bold mb-0">Your Goals</Card.Title>
                <Badge bg="primary" className="px-3 py-2">
                  R{totals.totalTarget.toLocaleString()} Total Target
                </Badge>
              </div>

              {goals.length === 0 ? (
                <div className="text-center py-5">
                  <div className="display-4 text-muted mb-3">🎯</div>
                  <h4 className="mb-2">No Goals Set Yet</h4>
                  <p className="text-muted mb-4">Start by setting your financial goals</p>
                </div>
              ) : (
                <div className="row g-3">
                  {goals.map((goal) => (
                    <Col key={goal.id} lg={6} className="mb-3">
                      <Card className="card-hover h-100">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 className="fw-bold mb-1">{goal.title}</h5>
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <Badge bg={getCategoryColor(goal.category)}>
                                  {getCategoryIcon(goal.category)} {goal.category}
                                </Badge>
                                {goal.progress >= 100 && (
                                  <Badge bg="success">Completed</Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="fw-bold text-primary">
                                R{goal.currentAmount.toLocaleString()}
                              </div>
                              <small className="text-muted">
                                of R{goal.targetAmount.toLocaleString()}
                              </small>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-muted">Progress</small>
                              <small className="fw-bold">{goal.progress.toFixed(1)}%</small>
                            </div>
                            <ProgressBar 
                              now={goal.progress} 
                              variant={goal.progress >= 100 ? 'success' : goal.progress >= 50 ? 'warning' : 'info'}
                              className="mb-2"
                              style={{ height: '8px' }}
                            />
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small className="text-muted d-block">
                                <FiCalendar className="me-1" />
                                Deadline: {new Date(goal.deadline).toLocaleDateString()}
                              </small>
                            </div>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(goal.id)}
                            >
                              <FiTrash2 />
                            </Button>
                          </div>

                          <div className="mt-3">
                            <GoalProgress 
                              goal={goal}
                              onUpdateProgress={(amount) => handleUpdateProgress(goal.id, amount)}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">Overall Progress</Card.Title>
              
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <div className="display-4 fw-bold text-primary">
                    {totals.overallProgress.toFixed(1)}%
                  </div>
                  <div className="text-muted">Achieved</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Target</span>
                  <span className="fw-bold">R{totals.totalTarget.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Current Amount</span>
                  <span className="fw-bold text-success">
                    R{totals.totalCurrent.toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Remaining</span>
                  <span className="fw-bold">
                    R{(totals.totalTarget - totals.totalCurrent).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="progress mb-4" style={{ height: '20px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${totals.overallProgress}%` }}
                >
                  {totals.overallProgress.toFixed(1)}%
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-bold mb-3">Goals by Category</h6>
                {['savings', 'debt', 'asset', 'investment'].map((category) => {
                  const categoryGoals = goals.filter(g => g.category === category);
                  const categoryTotal = categoryGoals.reduce((sum, g) => sum + g.targetAmount, 0);
                  const categoryCurrent = categoryGoals.reduce((sum, g) => sum + g.currentAmount, 0);
                  const categoryProgress = categoryTotal > 0 ? (categoryCurrent / categoryTotal) * 100 : 0;
                  
                  if (categoryGoals.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-capitalize">{category}</span>
                        <span className="fw-bold">{categoryProgress.toFixed(1)}%</span>
                      </div>
                      <ProgressBar 
                        now={categoryProgress}
                        variant={getCategoryColor(category)}
                        style={{ height: '6px' }}
                      />
                      <small className="text-muted d-block">
                        {categoryGoals.length} goal{categoryGoals.length !== 1 ? 's' : ''} • 
                        R{categoryCurrent.toLocaleString()} of R{categoryTotal.toLocaleString()}
                      </small>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GoalsSection;