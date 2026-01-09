import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { FiSave, FiX } from 'react-icons/fi';
import type { IncomeStream } from '../../data/mockData';

interface IncomeFormProps {
  income: IncomeStream | null;
  onSubmit: (income: IncomeStream) => void;
  onClose: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ income, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Omit<IncomeStream, 'id'>>({
    company: '',
    position: '',
    startDate: new Date().toISOString().split('T')[0],
    monthlyIncome: 0,
    monthlyExpenses: 0,
    description: '',
  });

  useEffect(() => {
    if (income) {
      setFormData(income);
    }
  }, [income]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'monthlyIncome' || name === 'monthlyExpenses') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeData: IncomeStream = {
      ...formData,
      id: income?.id || Date.now().toString(),
    };
    onSubmit(incomeData);
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="ubuntu-font fw-bold">
          {income ? 'Edit Income Stream' : 'Add Income Stream'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <FloatingLabel controlId="company" label="Company/Organization" className="mb-3">
                <Form.Control
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Tech Corp SA"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="position" label="Position/Role" className="mb-3">
                <Form.Control
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Senior Developer"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="startDate" label="Start Date" className="mb-3">
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="description" label="Description (Optional)" className="mb-3">
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Full-time employment / Freelance"
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="monthlyIncome" label="Monthly Income (R)" className="mb-3">
                <Form.Control
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  placeholder="45000"
                  min="0"
                  step="0.01"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="monthlyExpenses" label="Monthly Expenses (R)" className="mb-3">
                <Form.Control
                  type="number"
                  name="monthlyExpenses"
                  value={formData.monthlyExpenses}
                  onChange={handleChange}
                  placeholder="18000"
                  min="0"
                  step="0.01"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <div className="mt-4 p-3 bg-light rounded">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Monthly Income:</span>
                  <span className="fw-bold text-success">
                    R{formData.monthlyIncome.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Monthly Expenses:</span>
                  <span className="fw-bold text-warning">
                    R{formData.monthlyExpenses.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-between mt-2 pt-2 border-top">
                  <span className="text-muted">Net Monthly Income:</span>
                  <span className={`fw-bold ${
                    (formData.monthlyIncome - formData.monthlyExpenses) >= 0 ? 'text-info' : 'text-danger'
                  }`}>
                    R{(formData.monthlyIncome - formData.monthlyExpenses).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline-secondary" onClick={onClose}>
              <FiX className="me-2" />
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="btn-primary-custom">
              <FiSave className="me-2" />
              {income ? 'Update Income Stream' : 'Save Income Stream'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IncomeForm;