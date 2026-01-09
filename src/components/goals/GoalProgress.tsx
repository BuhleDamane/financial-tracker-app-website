import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import type { Goal } from '../../data/mockData';

interface GoalProgressProps {
  goal: Goal;
  onUpdateProgress: (newAmount: number) => void;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goal, onUpdateProgress }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const handleAddProgress = () => {
    if (amount <= 0) return;
    
    const newTotal = goal.currentAmount + amount;
    onUpdateProgress(newTotal);
    
    setAmount(0);
    setDescription('');
  };

  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsRemaining = goal.deadline ? 
    Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)) : 
    0;

  const monthlyContribution = monthsRemaining > 0 ? remaining / monthsRemaining : 0;

  return (
    <div className="p-3 bg-light rounded">
      <h6 className="fw-bold mb-3">Add Progress</h6>
      
      <Row className="g-2 mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="small">Amount (R)</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
              placeholder="Enter amount"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="small">Description (Optional)</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Monthly savings"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button 
        variant="success" 
        size="sm"
        onClick={handleAddProgress}
        disabled={amount <= 0}
        className="w-100 mb-3"
      >
        <FiPlus className="me-1" />
        Add Progress
      </Button>

      <div className="mt-3 pt-3 border-top">
        <small className="text-muted d-block mb-1">
          <strong>Remaining:</strong> R{remaining.toLocaleString()}
        </small>
        {monthsRemaining > 0 && (
          <>
            <small className="text-muted d-block mb-1">
              <strong>Months remaining:</strong> {monthsRemaining}
            </small>
            <small className="text-muted d-block">
              <strong>Suggested monthly:</strong> R{monthlyContribution.toFixed(2)}
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalProgress;