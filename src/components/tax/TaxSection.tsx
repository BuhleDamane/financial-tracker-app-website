import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { FaCalculator, FaPercent, FaDollarSign, FaInfoCircle, FaChartLine, FaPiggyBank } from 'react-icons/fa';

const TaxSection: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [medicalAidContributions, setMedicalAidContributions] = useState<number>(0);
  const [retirementContributions, setRetirementContributions] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  const taxBrackets = [
    { min: 0, max: 237100, rate: 0.18, fixed: 0 },
    { min: 237101, max: 370500, rate: 0.26, fixed: 42678 },
    { min: 370501, max: 512800, rate: 0.31, fixed: 77362 },
    { min: 512801, max: 673000, rate: 0.36, fixed: 121475 },
    { min: 673001, max: 857900, rate: 0.39, fixed: 179147 },
    { min: 857901, max: 1817000, rate: 0.41, fixed: 251258 },
    { min: 1817001, max: Infinity, rate: 0.45, fixed: 644489 }
  ];

  const medicalTaxCredits = {
    mainMember: 364,
    firstDependent: 364,
    additionalDependents: 246
  };

  const formatCurrency = (value: number) => {
    return `R${Math.round(value).toLocaleString('en-ZA')}`;
  };

  const calculateTax = () => {
    const maxRetirementDeduction = Math.min(annualIncome * 0.275, 350000);
    const retirementDeduction = Math.min(retirementContributions, maxRetirementDeduction);

    let taxableIncome = Math.max(0, annualIncome - retirementDeduction - otherDeductions);

    let tax = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome <= bracket.min) break;
      const taxableInBracket = Math.min(taxableIncome, bracket.max === Infinity ? taxableIncome : bracket.max) - bracket.min;
      tax = bracket.fixed + taxableInBracket * bracket.rate;
    }

    const medicalCredits = (medicalTaxCredits.mainMember + medicalTaxCredits.firstDependent) * 12;
    tax = Math.max(0, tax - medicalCredits);

    const monthlyTax = tax / 12;
    const netAnnualIncome = annualIncome - tax;
    const netMonthlyIncome = netAnnualIncome / 12;
    const effectiveTaxRate = annualIncome > 0 ? (tax / annualIncome) * 100 : 0;

    return {
      grossAnnualIncome: annualIncome,
      grossMonthlyIncome: annualIncome / 12,
      taxableIncome,
      annualTax: tax,
      monthlyTax,
      netAnnualIncome,
      netMonthlyIncome,
      effectiveTaxRate,
      retirementDeduction,
      medicalCredits
    };
  };

  const results = calculateTax();

  const getTaxBracketStyle = (rate: number) => {
    if (rate <= 0.18) return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
    if (rate <= 0.31) return { backgroundColor: '#e0f7f4', color: '#17a2b8', border: '1px solid #b2ebf2' };
    if (rate <= 0.36) return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' };
    return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
  };

  const statCards = [
    { icon: <FaDollarSign size={28} />, value: formatCurrency(results.annualTax), label: 'Annual Tax Liability', color: '#17a2b8', bg: '#e0f7f4' },
    { icon: <FaPercent size={28} />, value: `${results.effectiveTaxRate.toFixed(1)}%`, label: 'Effective Tax Rate', color: '#51cf66', bg: '#d4edda' },
    { icon: <FaChartLine size={28} />, value: formatCurrency(results.netMonthlyIncome), label: 'Net Monthly Income', color: '#17a2b8', bg: '#e0f7f4' },
    { icon: <FaPiggyBank size={28} />, value: formatCurrency(results.retirementDeduction), label: 'Retirement Deduction', color: '#ffc107', bg: '#fff3cd' },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ paddingLeft: '40px', padding: '45px' }}>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Tax Calculator
              </h1>
              <p className="text-muted roboto-font">
                Calculate your estimated tax liability and understand SARS tax brackets
              </p>
            </div>
            <div
              className="p-3 rounded-circle"
              style={{ backgroundColor: '#e0f7f4', color: '#17a2b8' }}
            >
              <FaPercent size={30} />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4" style={{ color: '#2c3e50' }}>
                <FaCalculator className="me-2" style={{ color: '#17a2b8' }} />
                Tax Calculator
              </Card.Title>

              <Form className="settings-form">
                <Form.Group className="mb-3">
                  <Form.Label className="roboto-font fw-medium">
                    Annual Income (R)
                    <span
                      className="ms-2 category-badge roboto-font"
                      style={{ backgroundColor: '#e0f7f4', color: '#17a2b8', border: '1px solid #b2ebf2' }}
                    >
                      Required
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={annualIncome || ''}
                    onChange={(e) => setAnnualIncome(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                    placeholder="Enter annual income"
                  />
                  <Form.Text className="text-muted roboto-font">
                    Your total annual income before deductions
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="roboto-font fw-medium">Retirement Contributions (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={retirementContributions || ''}
                    onChange={(e) => setRetirementContributions(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                    placeholder="Enter retirement contributions"
                  />
                  <Form.Text className="text-muted roboto-font">
                    Maximum deductible: 27.5% of income or R350,000
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="roboto-font fw-medium">Medical Aid Contributions (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={medicalAidContributions || ''}
                    onChange={(e) => setMedicalAidContributions(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                    placeholder="Enter medical aid contributions"
                  />
                  <Form.Text className="text-muted roboto-font">
                    Annual medical aid contributions
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="roboto-font fw-medium">Other Deductions (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={otherDeductions || ''}
                    onChange={(e) => setOtherDeductions(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                    placeholder="Enter other deductions"
                  />
                  <Form.Text className="text-muted roboto-font">
                    Other tax-deductible expenses
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    className="btn-custom btn-primary-custom text-white roboto-font"
                    onClick={() => {}}
                  >
                    Calculate Tax
                  </Button>
                </div>
              </Form>

              <div className="mt-4 pt-3 border-top">
                <h6 className="ubuntu-font fw-bold mb-3" style={{ color: '#2c3e50' }}>
                  <FaInfoCircle className="me-2" style={{ color: '#17a2b8' }} />
                  Important Notes
                </h6>
                <ul className="small text-muted roboto-font" style={{ paddingLeft: '1.2rem' }}>
                  <li className="mb-1">Based on SARS 2024/2025 tax tables</li>
                  <li className="mb-1">Medical tax credits: R364 per month for main member + first dependent</li>
                  <li className="mb-1">Retirement fund deduction limited to 27.5% of income or R350,000</li>
                  <li>This is an estimate. Consult a tax professional for accurate calculations</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Row className="g-4">
            {statCards.map((stat, index) => (
              <Col key={index} md={6}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="text-center">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                        style={{ backgroundColor: stat.bg, color: stat.color, width: '64px', height: '64px' }}
                      >
                        {stat.icon}
                      </div>
                      <h3 className="ubuntu-font fw-bold">{stat.value}</h3>
                      <p className="text-muted roboto-font mb-0">{stat.label}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">Tax Breakdown</Card.Title>

              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th className="roboto-font">Description</th>
                      <th className="roboto-font">Annual Amount</th>
                      <th className="roboto-font">Monthly Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="roboto-font">Gross Income</td>
                      <td className="roboto-font fw-bold">{formatCurrency(results.grossAnnualIncome)}</td>
                      <td className="text-muted roboto-font">{formatCurrency(results.grossMonthlyIncome)}</td>
                    </tr>
                    <tr>
                      <td className="roboto-font">Taxable Income</td>
                      <td className="roboto-font fw-bold">{formatCurrency(results.taxableIncome)}</td>
                      <td className="text-muted roboto-font">{formatCurrency(results.taxableIncome / 12)}</td>
                    </tr>
                    <tr>
                      <td className="roboto-font">Tax Liability</td>
                      <td className="roboto-font fw-bold" style={{ color: '#ff6b6b' }}>{formatCurrency(results.annualTax)}</td>
                      <td className="text-muted roboto-font">{formatCurrency(results.monthlyTax)}</td>
                    </tr>
                    <tr>
                      <td className="roboto-font">Medical Tax Credits</td>
                      <td className="roboto-font fw-bold" style={{ color: '#51cf66' }}>{formatCurrency(results.medicalCredits)}</td>
                      <td className="text-muted roboto-font">{formatCurrency(results.medicalCredits / 12)}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#e0f7f4' }}>
                      <td className="roboto-font fw-bold">Net Income</td>
                      <td className="roboto-font fw-bold">{formatCurrency(results.netAnnualIncome)}</td>
                      <td className="roboto-font fw-bold">{formatCurrency(results.netMonthlyIncome)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">SARS Tax Brackets 2024/2025</Card.Title>

              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th className="roboto-font">Taxable Income (Annual)</th>
                      <th className="roboto-font">Tax Rate</th>
                      <th className="roboto-font">Fixed Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxBrackets.map((bracket, index) => (
                      <tr key={index}>
                        <td className="roboto-font">
                          R{bracket.min.toLocaleString('en-ZA')} — {bracket.max === Infinity ? 'Above' : `R${bracket.max.toLocaleString('en-ZA')}`}
                        </td>
                        <td>
                          <span className="category-badge roboto-font" style={getTaxBracketStyle(bracket.rate)}>
                            {(bracket.rate * 100).toFixed(0)}%
                          </span>
                        </td>
                        <td className="roboto-font">
                          {bracket.fixed > 0 ? `R${bracket.fixed.toLocaleString('en-ZA')}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div
                className="mt-3 p-3 rounded d-flex align-items-start gap-3"
                style={{ backgroundColor: '#e0f7f4', border: '1px solid #b2ebf2' }}
              >
                <FaInfoCircle size={18} style={{ color: '#17a2b8', flexShrink: 0, marginTop: '2px' }} />
                <p className="roboto-font mb-0" style={{ color: '#2c3e50' }}>
                  <strong>How it works:</strong> Each portion of your income is taxed at the rate for that bracket.
                  For example, if you earn R400,000, the first R237,100 is taxed at 18%, the next portion up to R370,500 at 26%,
                  and the remaining at 31%.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaxSection;