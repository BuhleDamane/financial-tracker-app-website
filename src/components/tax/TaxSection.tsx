import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Badge } from 'react-bootstrap';
import { FaCalculator, FaPercent, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

const TaxSection: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(500000);
  const [medicalAidContributions, setMedicalAidContributions] = useState<number>(30000);
 const [retirementContributions, setRetirementContributions] = useState<number>(100000);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // SARS Tax Brackets for 2024/2025 (South Africa)
  const taxBrackets = [
    { min: 0, max: 237100, rate: 0.18, fixed: 0 },
    { min: 237101, max: 370500, rate: 0.26, fixed: 42678 },
    { min: 370501, max: 512800, rate: 0.31, fixed: 77362 },
    { min: 512801, max: 673000, rate: 0.36, fixed: 121475 },
    { min: 673001, max: 857900, rate: 0.39, fixed: 179147 },
    { min: 857901, max: 1817000, rate: 0.41, fixed: 251258 },
    { min: 1817001, max: Infinity, rate: 0.45, fixed: 644489 }
  ];

  // Medical Aid Tax Credits (2024/2025)
  const medicalTaxCredits = {
    mainMember: 364,
    firstDependent: 364,
    additionalDependents: 246
  };

  const calculateTax = () => {
    let taxableIncome = annualIncome;
    
    // Deduct retirement contributions (limited to 27.5% of income or R350,000)
    const maxRetirementDeduction = Math.min(annualIncome * 0.275, 350000);
    const retirementDeduction = Math.min(retirementContributions, maxRetirementDeduction);
    taxableIncome -= retirementDeduction;
    
    // Calculate tax based on brackets
    let tax = 0;
    let bracketUsed = null;
    
    for (const bracket of taxBrackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableInBracket * bracket.rate;
        bracketUsed = bracket;
      } else {
        break;
      }
    }
    
    if (bracketUsed && taxableIncome > bracketUsed.max) {
      tax += bracketUsed.fixed;
    }
    
    // Apply medical tax credits
    const medicalCredits = (medicalTaxCredits.mainMember + medicalTaxCredits.firstDependent) * 12;
    tax = Math.max(0, tax - medicalCredits);
    
    // Apply other deductions
    taxableIncome -= otherDeductions;
    
    const monthlyTax = tax / 12;
    const netAnnualIncome = annualIncome - tax;
    const netMonthlyIncome = netAnnualIncome / 12;
    const effectiveTaxRate = (tax / annualIncome) * 100;
    
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

  const getTaxBracketColor = (rate: number) => {
    if (rate <= 0.18) return 'success';
    if (rate <= 0.31) return 'info';
    if (rate <= 0.36) return 'warning';
    return 'danger';
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Tax Calculator
              </h1>
              <p className="text-muted">
                Calculate your estimated tax liability and understand SARS tax brackets
              </p>
            </div>
            <div className="bg-primary-subtle p-3 rounded-circle">
              <FaPercent className="text-primary" size={30} />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">
                <FaCalculator className="me-2" />
                Tax Calculator
              </Card.Title>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Annual Income (R)
                    <Badge bg="info" className="ms-2">Required</Badge>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                  <Form.Text className="text-muted">
                    Your total annual income before deductions
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Retirement Contributions (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={retirementContributions}
                    onChange={(e) => setRetirementContributions(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                  <Form.Text className="text-muted">
                    Maximum deductible: 27.5% of income or R350,000
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Medical Aid Contributions (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={medicalAidContributions}
                    onChange={(e) => setMedicalAidContributions(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                  <Form.Text className="text-muted">
                    Annual medical aid contributions
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Other Deductions (R)</Form.Label>
                  <Form.Control
                    type="number"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                  <Form.Text className="text-muted">
                    Other tax-deductible expenses
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    className="btn-primary-custom"
                    onClick={() => {}}
                  >
                    Calculate Tax
                  </Button>
                </div>
              </Form>

              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-bold mb-3">
                  <FaInfoCircle className="me-2" />
                  Important Notes
                </h6>
                <ul className="small text-muted">
                  <li>Based on SARS 2024/2025 tax tables</li>
                  <li>Medical tax credits: R364 per month for main member + first dependent</li>
                  <li>Retirement fund deduction limited to 27.5% of income or R350,000</li>
                  <li>This is an estimate. Consult a tax professional for accurate calculations</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="text-center">
                    <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                      <FaDollarSign className="text-primary" size={30} />
                    </div>
                    <h3 className="fw-bold">R{results.annualTax.toLocaleString()}</h3>
                    <p className="text-muted mb-0">Annual Tax Liability</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="text-center">
                    <div className="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                      <FaPercent className="text-success" size={30} />
                    </div>
                    <h3 className="fw-bold">{results.effectiveTaxRate.toFixed(1)}%</h3>
                    <p className="text-muted mb-0">Effective Tax Rate</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="text-center">
                    <div className="bg-info-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                      <span className="text-info fw-bold">📈</span>
                    </div>
                    <h3 className="fw-bold">R{results.netMonthlyIncome.toLocaleString()}</h3>
                    <p className="text-muted mb-0">Net Monthly Income</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="text-center">
                    <div className="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                      <span className="text-warning fw-bold">💰</span>
                    </div>
                    <h3 className="fw-bold">R{results.retirementDeduction.toLocaleString()}</h3>
                    <p className="text-muted mb-0">Retirement Deduction</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body>
              <Card.Title className="ubuntu-font fw-bold mb-4">Tax Breakdown</Card.Title>
              
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Annual Amount</th>
                      <th>Monthly Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gross Income</td>
                      <td className="fw-bold">R{results.grossAnnualIncome.toLocaleString()}</td>
                      <td className="text-muted">R{results.grossMonthlyIncome.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Taxable Income</td>
                      <td className="fw-bold">R{results.taxableIncome.toLocaleString()}</td>
                      <td className="text-muted">R{(results.taxableIncome / 12).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Tax Liability</td>
                      <td className="fw-bold text-danger">R{results.annualTax.toLocaleString()}</td>
                      <td className="text-muted">R{results.monthlyTax.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Medical Tax Credits</td>
                      <td className="fw-bold text-success">R{results.medicalCredits.toLocaleString()}</td>
                      <td className="text-muted">R{(results.medicalCredits / 12).toLocaleString()}</td>
                    </tr>
                    <tr className="table-success">
                      <td><strong>Net Income</strong></td>
                      <td className="fw-bold">R{results.netAnnualIncome.toLocaleString()}</td>
                      <td className="fw-bold">R{results.netMonthlyIncome.toLocaleString()}</td>
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
                      <th>Taxable Income (Annual)</th>
                      <th>Tax Rate</th>
                      <th>Fixed Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxBrackets.map((bracket, index) => (
                      <tr key={index}>
                        <td>
                          {bracket.min.toLocaleString()} - {bracket.max === Infinity ? 'Above' : bracket.max.toLocaleString()}
                        </td>
                        <td>
                          <Badge bg={getTaxBracketColor(bracket.rate)} className="px-3 py-2">
                            {(bracket.rate * 100).toFixed(0)}%
                          </Badge>
                        </td>
                        <td>
                          {bracket.fixed > 0 ? `R${bracket.fixed.toLocaleString()}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Alert variant="info" className="mt-3">
                <FaInfoCircle className="me-2" />
                <strong>How it works:</strong> Each portion of your income is taxed at the rate for that bracket. 
                For example, if you earn R400,000, the first R237,100 is taxed at 18%, the next portion up to R370,500 at 26%, 
                and the remaining at 31%.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaxSection;