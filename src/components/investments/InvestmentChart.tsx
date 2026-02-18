import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiPieChart } from 'react-icons/fi';
import type { Investment } from '../../data/mockData';
import { Row, Col, Card } from 'react-bootstrap';

interface InvestmentChartProps {
  investments: Investment[];
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ investments }) => {
  const COLORS = ['#17a2b8', '#2c3e50', '#51cf66', '#ffc107', '#ff6b6b'];

  const calculateData = () => {
    const typeMap: Record<string, number> = {};

    investments.forEach(investment => {
      const type = investment.type;
      typeMap[type] = (typeMap[type] || 0) + investment.amount;
    });

    const total = Object.values(typeMap).reduce((sum, amount) => sum + amount, 0);

    return Object.entries(typeMap).map(([type, amount]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: amount,
      percentage: total > 0 ? ((amount / total) * 100).toFixed(1) : '0'
    }));
  };

  const data = calculateData();
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (investments.length === 0) {
    return (
      <Card className="border-0 shadow-sm chart-container">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Card.Title className="ubuntu-font fw-bold mb-1">Investment Allocation</Card.Title>
              <p className="text-muted small">Distribution across different investment types</p>
            </div>
            <div className="p-2 rounded-circle" style={{ backgroundColor: '#e0f7f4' }}>
              <FiPieChart style={{ color: '#17a2b8' }} size={24} />
            </div>
          </div>

          <div className="text-center py-5">
            <FiPieChart size={48} className="mb-3" style={{ color: '#17a2b8', opacity: 0.4 }} />
            <h5 className="ubuntu-font fw-bold mb-2">No Investments Yet</h5>
            <p className="text-muted roboto-font">Start adding investments to see your portfolio allocation</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm chart-container">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Card.Title className="ubuntu-font fw-bold mb-1">Investment Allocation</Card.Title>
            <p className="text-muted small roboto-font">
              Total Invested: <strong className="text-dark">R{totalInvested.toLocaleString()}</strong>
            </p>
          </div>
          <div className="p-2 rounded-circle" style={{ backgroundColor: '#e0f7f4' }}>
            <FiPieChart style={{ color: '#17a2b8' }} size={24} />
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`R${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col lg={4}>
            <div className="mt-4 mt-lg-0">
              <h6 className="ubuntu-font fw-bold mb-3">Investment Breakdown</h6>
              {data.map((item, index) => (
                <div key={item.name} className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle me-3 flex-shrink-0"
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="roboto-font fw-medium">{item.name}</span>
                      <span className="roboto-font fw-bold">R{item.value.toLocaleString()}</span>
                    </div>
                    <div className="progress mt-1" style={{ height: '6px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                        aria-valuenow={parseFloat(item.percentage)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small className="text-muted roboto-font">{item.percentage}% of portfolio</small>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default InvestmentChart;