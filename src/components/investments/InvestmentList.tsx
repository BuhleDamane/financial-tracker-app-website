import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Investment } from '../../data/mockData';

interface InvestmentListProps {
  investments: Investment[];
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}

const termColors: Record<string, string> = {
  long: '#51cf66',
  intermediate: '#ffc107',
  short: '#17a2b8',
};

const InvestmentList: React.FC<InvestmentListProps> = ({ investments, onEdit, onDelete }) => {
  return (
    <Row>
      {investments.map((investment) => (
        <Col key={investment.id} lg={6} className="mb-3">
          <Card className="card-hover h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="ubuntu-font fw-bold mb-1" style={{ color: '#2c3e50' }}>
                    {investment.company}
                  </h5>
                  <p className="text-muted small roboto-font mb-2">
                    {investment.stockName} • {investment.investmentSite}
                  </p>
                </div>
                <span
                  className="category-badge text-uppercase"
                  style={{
                    backgroundColor: investment.isTFSA ? '#d4edda' : '#e0f7f4',
                    color: investment.isTFSA ? '#155724' : '#17a2b8',
                    border: `1px solid ${investment.isTFSA ? '#c3e6cb' : '#b2ebf2'}`,
                  }}
                >
                  {investment.isTFSA ? 'TFSA' : investment.type}
                </span>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted roboto-font">Amount Invested</span>
                  <span className="fw-bold roboto-font">R{investment.amount.toLocaleString()}</span>
                </div>

                {investment.numberOfStocks ? (
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted roboto-font">Number of Stocks</span>
                    <span className="fw-bold roboto-font">{investment.numberOfStocks}</span>
                  </div>
                ) : null}

                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted roboto-font">Stock Type</span>
                  <span className="roboto-font">{investment.stockType}</span>
                </div>

                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted roboto-font">Date Invested</span>
                  <span className="roboto-font">
                    {new Date(investment.dateInvested).toLocaleDateString()}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="text-muted roboto-font">Investment Term</span>
                  <span
                    className="category-badge text-capitalize"
                    style={{
                      backgroundColor: `${termColors[investment.investmentTerm]}22`,
                      color: termColors[investment.investmentTerm],
                      border: `1px solid ${termColors[investment.investmentTerm]}55`,
                    }}
                  >
                    {investment.investmentTerm}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  size="sm"
                  onClick={() => onEdit(investment)}
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
                  onClick={() => onDelete(investment.id)}
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
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default InvestmentList;