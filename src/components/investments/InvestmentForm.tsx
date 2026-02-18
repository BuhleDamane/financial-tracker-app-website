import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { FiSave, FiX } from 'react-icons/fi';
import type { Investment } from '../../data/mockData';

interface InvestmentFormProps {
  investment: Investment | null;
  onSubmit: (investment: Investment) => void;
  onClose: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ investment, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Omit<Investment, 'id'>>({
    type: 'stocks',
    company: '',
    investmentSite: '',
    amount: 0,
    dateInvested: new Date().toISOString().split('T')[0],
    numberOfStocks: 0,
    investmentTerm: 'long',
    stockName: '',
    stockType: '',
    isTFSA: false,
  });

  useEffect(() => {
    if (investment) {
      setFormData(investment);
    }
  }, [investment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'amount' || name === 'numberOfStocks') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const investmentData: Investment = {
      ...formData,
      id: investment?.id || Date.now().toString(),
    };
    onSubmit(investmentData);
  };

  const investmentSites = [
    'EasyEquities', 'Luno', 'SATRIX', 'Sygnia', 'Allan Gray',
    'Coronation', 'Ninety One', 'Standard Bank', 'Absa', 'FNB',
    'Nedbank', 'Investec', 'Other'
  ];

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header
        closeButton
        className="border-0 pb-0"
        style={{ borderBottom: '2px solid #e0f7f4' }}
      >
        <Modal.Title className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
          {investment ? 'Edit Investment' : 'Add New Investment'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="settings-form">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <FloatingLabel controlId="type" label="Investment Type" className="mb-3">
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="stocks">Stocks</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="pension">Pension Fund</option>
                  <option value="retirement">Retirement Annuity</option>
                  <option value="other">Other</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="company" label="Company/Institution" className="mb-3">
                <Form.Control
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="investmentSite" label="Investment Platform/Site" className="mb-3">
                <Form.Select
                  name="investmentSite"
                  value={formData.investmentSite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select platform</option>
                  {investmentSites.map(site => (
                    <option key={site} value={site}>{site}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="amount" label="Amount Invested (R)" className="mb-3">
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder=" "
                  min="0"
                  step="0.01"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="dateInvested" label="Date Invested" className="mb-3">
                <Form.Control
                  type="date"
                  name="dateInvested"
                  value={formData.dateInvested}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </FloatingLabel>
            </Col>

            {formData.type === 'stocks' && (
              <Col md={6}>
                <FloatingLabel controlId="numberOfStocks" label="Number of Stocks/Shares" className="mb-3">
                  <Form.Control
                    type="number"
                    name="numberOfStocks"
                    value={formData.numberOfStocks || ''}
                    onChange={handleChange}
                    placeholder=" "
                    min="0"
                  />
                </FloatingLabel>
              </Col>
            )}

            <Col md={6}>
              <FloatingLabel controlId="investmentTerm" label="Investment Term" className="mb-3">
                <Form.Select
                  name="investmentTerm"
                  value={formData.investmentTerm}
                  onChange={handleChange}
                  required
                >
                  <option value="short">Short Term (1-3 years)</option>
                  <option value="intermediate">Intermediate (3-10 years)</option>
                  <option value="long">Long Term (10+ years)</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="stockName" label="Stock/Asset Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="stockName"
                  value={formData.stockName}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="stockType" label="Type of Stock/Asset" className="mb-3">
                <Form.Control
                  type="text"
                  name="stockType"
                  value={formData.stockType}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <div className="mb-3 d-flex align-items-center" style={{ paddingTop: '0.75rem' }}>
                <Form.Check
                  type="checkbox"
                  id="isTFSA"
                  name="isTFSA"
                  label="TFSA (Tax Free Savings Account)"
                  checked={formData.isTFSA}
                  onChange={handleChange}
                  className="roboto-font"
                />
              </div>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="outline-secondary"
              onClick={onClose}
              className="btn-custom roboto-font"
            >
              <FiX className="me-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-custom btn-primary-custom text-white roboto-font"
            >
              <FiSave className="me-2" />
              {investment ? 'Update Investment' : 'Save Investment'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InvestmentForm;