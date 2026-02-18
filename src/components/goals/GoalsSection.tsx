import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FiPlus, FiTarget, FiCalendar, FiTrendingUp, FiTrash2 } from 'react-icons/fi';
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

  const categoryColors: Record<string, string> = {
    savings: '#51cf66',
    debt: '#ffc107',
    asset: '#17a2b8',
    investment: '#2c3e50',
    other: '#6c757d',
  };

  const getCategoryBadgeStyle = (category: string) => ({
    backgroundColor: `${categoryColors[category] || '#6c757d'}22`,
    color: categoryColors[category] || '#6c757d',
    border: `1px solid ${categoryColors[category] || '#6c757d'}55`,
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#51cf66';
    if (progress >= 50) return '#ffc107';
    return '#17a2b8';
  };

  const statCards = [
    { icon: <FiTarget size={30} />, value: goals.length, label: 'Total Goals', color: '#17a2b8', bg: '#e0f7f4' },
    { icon: <FiTrendingUp size={30} />, value: totals.completedGoals, label: 'Completed', color: '#51cf66', bg: '#d4edda' },
    { icon: <FiCalendar size={30} />, value: totals.inProgressGoals, label: 'In Progress', color: '#17a2b8', bg: '#e0f7f4' },
    { icon: <FiTarget size={30} />, value: `${totals.overallProgress.toFixed(1)}%`, label: 'Overall Progress', color: '#ffc107', bg: '#fff3cd' },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ paddingLeft: '40px' }}>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Goals & Progress
              </h1>
              <p className="text-muted roboto-font">
                Set financial goals and track your progress towards achieving them
              </p>
            </div>
            <Button
              className="btn-custom btn-primary-custom text-white d-flex align-items-center roboto-font"
              onClick={() => setShowForm(!showForm)}
            >
              <FiPlus className="me-2" />
              {showForm ? 'Cancel' : 'Add New Goal'}
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        {statCards.map((stat, index) => (
          <Col key={index} lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                  style={{ backgroundColor: stat.bg, color: stat.color, width: '64px', height: '64px' }}
                >
                  {stat.icon}
                </div>
                <h3 className="ubuntu-font fw-bold">{stat.value}</h3>
                <p className="text-muted roboto-font mb-0">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {showForm && (
        <Card className="border-0 shadow-sm mb-4 form-container settings-form">
          <Card.Body>
            <h5 className="ubuntu-font fw-bold mb-4" style={{ color: '#2c3e50' }}>Add New Financial Goal</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Goal Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder=" "
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Category</Form.Label>
                  <Form.Select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
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
                  <Form.Label className="roboto-font fw-medium">Target Amount (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    placeholder=" "
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Current Amount Saved (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    placeholder=" "
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    placeholder=" "
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="roboto-font fw-medium">Progress Preview</Form.Label>
                  <div className="p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="roboto-font small">Progress:</span>
                      <span className="roboto-font small fw-bold">
                        {newGoal.targetAmount > 0
                          ? `${((newGoal.currentAmount / newGoal.targetAmount) * 100).toFixed(1)}%`
                          : '0%'}
                      </span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${newGoal.targetAmount > 0 ? (newGoal.currentAmount / newGoal.targetAmount) * 100 : 0}%`,
                          backgroundColor: '#51cf66',
                        }}
                      />
                    </div>
                  </div>
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
                    onClick={handleAddGoal}
                  >
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
                <span
                  className="category-badge roboto-font"
                  style={{ backgroundColor: '#e0f7f4', color: '#17a2b8', border: '1px solid #b2ebf2' }}
                >
                  R{totals.totalTarget.toLocaleString()} Total Target
                </span>
              </div>

              {goals.length === 0 ? (
                <div className="text-center py-5">
                  <FiTarget size={48} className="mb-3" style={{ color: '#17a2b8', opacity: 0.4 }} />
                  <h5 className="ubuntu-font fw-bold mb-2">No Goals Set Yet</h5>
                  <p className="text-muted roboto-font mb-4">Start by setting your financial goals</p>
                </div>
              ) : (
                <div className="row g-3">
                  {goals.map((goal) => (
                    <Col key={goal.id} lg={6} className="mb-3">
                      <Card className="card-hover h-100 border-0 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 className="ubuntu-font fw-bold mb-1">{goal.title}</h5>
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span
                                  className="category-badge text-capitalize roboto-font"
                                  style={getCategoryBadgeStyle(goal.category)}
                                >
                                  {goal.category}
                                </span>
                                {goal.progress >= 100 && (
                                  <span
                                    className="category-badge roboto-font"
                                    style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }}
                                  >
                                    Completed
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="roboto-font fw-bold" style={{ color: '#17a2b8' }}>
                                R{goal.currentAmount.toLocaleString()}
                              </div>
                              <small className="text-muted roboto-font">
                                of R{goal.targetAmount.toLocaleString()}
                              </small>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-muted roboto-font">Progress</small>
                              <small className="roboto-font fw-bold">{goal.progress.toFixed(1)}%</small>
                            </div>
                            <div className="progress mb-2" style={{ height: '8px' }}>
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${Math.min(goal.progress, 100)}%`,
                                  backgroundColor: getProgressColor(goal.progress),
                                }}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted roboto-font">
                              <FiCalendar className="me-1" />
                              Deadline: {new Date(goal.deadline).toLocaleDateString()}
                            </small>
                            <Button
                              size="sm"
                              onClick={() => handleDelete(goal.id)}
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
                <div className="ubuntu-font fw-bold" style={{ fontSize: '3rem', color: '#17a2b8' }}>
                  {totals.overallProgress.toFixed(1)}%
                </div>
                <div className="text-muted roboto-font">Achieved</div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Total Target</span>
                  <span className="roboto-font fw-bold">R{totals.totalTarget.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Current Amount</span>
                  <span className="roboto-font fw-bold" style={{ color: '#51cf66' }}>
                    R{totals.totalCurrent.toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted roboto-font">Remaining</span>
                  <span className="roboto-font fw-bold">
                    R{(totals.totalTarget - totals.totalCurrent).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="progress mb-4" style={{ height: '20px', borderRadius: '10px' }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min(totals.overallProgress, 100)}%`,
                    backgroundColor: '#51cf66',
                    borderRadius: '10px',
                  }}
                >
                  <span className="roboto-font">{totals.overallProgress.toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="ubuntu-font fw-bold mb-3">Goals by Category</h6>
                {['savings', 'debt', 'asset', 'investment'].map((category) => {
                  const categoryGoals = goals.filter(g => g.category === category);
                  const categoryTotal = categoryGoals.reduce((sum, g) => sum + g.targetAmount, 0);
                  const categoryCurrent = categoryGoals.reduce((sum, g) => sum + g.currentAmount, 0);
                  const categoryProgress = categoryTotal > 0 ? (categoryCurrent / categoryTotal) * 100 : 0;

                  if (categoryGoals.length === 0) return null;

                  return (
                    <div key={category} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="roboto-font text-capitalize">{category}</span>
                        <span className="roboto-font fw-bold">{categoryProgress.toFixed(1)}%</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${categoryProgress}%`,
                            backgroundColor: categoryColors[category] || '#6c757d',
                          }}
                        />
                      </div>
                      <small className="text-muted roboto-font d-block">
                        {categoryGoals.length} goal{categoryGoals.length !== 1 ? 's' : ''} •{' '}
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