import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiPieChart } from 'react-icons/fi';
import type { BudgetItem } from '../../data/mockData';

interface BudgetChartProps {
  budgetItems: BudgetItem[];
}

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetItems }) => {
  const COLORS = ['#17a2b8', '#2c3e50', '#51cf66', '#ffc107', '#ff6b6b'];

  const calculateData = () => {
    const categoryMap: Record<string, number> = {};

    budgetItems.forEach(item => {
      categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
    });

    return Object.entries(categoryMap).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  };

  const calculateStatusData = () => {
    const statusCounts = { green: 0, orange: 0, red: 0 };

    budgetItems.forEach(item => {
      statusCounts[item.status]++;
    });

    return [
      { name: 'Within Budget', value: statusCounts.green, color: '#51cf66' },
      { name: 'Approaching Limit', value: statusCounts.orange, color: '#ffc107' },
      { name: 'Over Budget', value: statusCounts.red, color: '#ff6b6b' },
    ];
  };

  const data = calculateData();
  const statusData = calculateStatusData();
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  if (budgetItems.length === 0) {
    return (
      <Card className="border-0 shadow-sm chart-container">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Card.Title className="ubuntu-font fw-bold mb-1">Budget Overview</Card.Title>
              <p className="text-muted small roboto-font">Distribution of your budget across categories</p>
            </div>
            <div className="p-2 rounded-circle" style={{ backgroundColor: '#e0f7f4' }}>
              <FiPieChart style={{ color: '#17a2b8' }} size={24} />
            </div>
          </div>

          <div className="text-center py-5">
            <FiPieChart size={48} className="mb-3" style={{ color: '#17a2b8', opacity: 0.4 }} />
            <h5 className="ubuntu-font fw-bold mb-2">No Budget Items Yet</h5>
            <p className="text-muted roboto-font">Add budget items to see your spending distribution</p>
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
            <Card.Title className="ubuntu-font fw-bold mb-1">Budget Overview</Card.Title>
            <p className="text-muted small roboto-font">
              Total Budget: <strong className="text-dark">R{totalBudget.toLocaleString()}</strong>
            </p>
          </div>
          <div className="p-2 rounded-circle" style={{ backgroundColor: '#e0f7f4' }}>
            <FiPieChart style={{ color: '#17a2b8' }} size={24} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${((entry.value / totalBudget) * 100).toFixed(1)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | string) => `R${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="mt-4 mt-lg-0">
              <h6 className="ubuntu-font fw-bold mb-3">Budget Status</h6>
              {statusData.map((item) => (
                <div key={item.name} className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle me-3 flex-shrink-0"
                    style={{ width: '12px', height: '12px', backgroundColor: item.color }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="roboto-font fw-medium">{item.name}</span>
                      <span className="roboto-font fw-bold">{item.value} items</span>
                    </div>
                    <div className="progress mt-1" style={{ height: '6px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${(item.value / budgetItems.length) * 100}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <small className="text-muted roboto-font">
                      {((item.value / budgetItems.length) * 100).toFixed(1)}% of categories
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BudgetChart;