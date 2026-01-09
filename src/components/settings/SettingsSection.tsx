import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { FiUser, FiLock, FiBell, FiShield, FiTrash2, FiSave } from 'react-icons/fi';

const SettingsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    // Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+27 123 456 7890',
    dateOfBirth: '1990-01-01',
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    budgetAlerts: true,
    investmentAlerts: true,
    goalReminders: true,
    
    // Privacy
    dataSharing: false,
    analyticsEnabled: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    alert('Password changed successfully!');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request submitted. You will receive an email confirmation.');
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Account Settings
              </h1>
              <p className="text-muted">
                Manage your account preferences and security settings
              </p>
            </div>
            <div className="bg-primary-subtle p-3 rounded-circle">
              <FiUser className="text-primary" size={30} />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || 'profile')}
                className="mb-4"
              >
                <Tab eventKey="profile" title={
                  <span className="d-flex align-items-center">
                    <FiUser className="me-2" />
                    Profile
                  </span>
                }>
                  <div className="mt-4">
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                          <Button variant="outline-secondary">
                            Cancel
                          </Button>
                          <Button 
                            variant="primary" 
                            className="btn-primary-custom"
                            onClick={handleSaveProfile}
                          >
                            <FiSave className="me-2" />
                            Save Changes
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>

                <Tab eventKey="security" title={
                  <span className="d-flex align-items-center">
                    <FiLock className="me-2" />
                    Security
                  </span>
                }>
                  <div className="mt-4">
                    <Row className="g-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mt-3">
                          <Form.Check
                            type="switch"
                            id="twoFactorEnabled"
                            name="twoFactorEnabled"
                            label="Enable Two-Factor Authentication"
                            checked={formData.twoFactorEnabled}
                            onChange={handleInputChange}
                          />
                          <Form.Text className="text-muted">
                            Add an extra layer of security to your account
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                          <Button 
                            variant="primary" 
                            className="btn-primary-custom"
                            onClick={handleChangePassword}
                          >
                            Change Password
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>

                <Tab eventKey="notifications" title={
                  <span className="d-flex align-items-center">
                    <FiBell className="me-2" />
                    Notifications
                  </span>
                }>
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Notification Preferences</h6>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="emailNotifications"
                        name="emailNotifications"
                        label="Email Notifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Receive important updates via email
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="pushNotifications"
                        name="pushNotifications"
                        label="Push Notifications"
                        checked={formData.pushNotifications}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Get real-time updates on your device
                      </Form.Text>
                    </Form.Group>

                    <div className="mt-4">
                      <h6 className="fw-bold mb-3">Alert Types</h6>
                      
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="budgetAlerts"
                          name="budgetAlerts"
                          label="Budget Alerts"
                          checked={formData.budgetAlerts}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted">
                          Get notified when approaching budget limits
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="investmentAlerts"
                          name="investmentAlerts"
                          label="Investment Alerts"
                          checked={formData.investmentAlerts}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted">
                          Receive updates on investment performance
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="goalReminders"
                          name="goalReminders"
                          label="Goal Reminders"
                          checked={formData.goalReminders}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted">
                          Reminders for goal contributions
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="privacy" title={
                  <span className="d-flex align-items-center">
                    <FiShield className="me-2" />
                    Privacy
                  </span>
                }>
                  <div className="mt-4">
                    <Form.Group className="mb-4">
                      <Form.Check
                        type="switch"
                        id="dataSharing"
                        name="dataSharing"
                        label="Allow Anonymous Data Sharing"
                        checked={formData.dataSharing}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Help improve our services by sharing anonymous usage data
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="switch"
                        id="analyticsEnabled"
                        name="analyticsEnabled"
                        label="Enable Analytics"
                        checked={formData.analyticsEnabled}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Allow us to collect analytics to improve your experience
                      </Form.Text>
                    </Form.Group>

                    <Alert variant="info">
                      <FiShield className="me-2" />
                      <strong>Your privacy matters:</strong> We never sell your personal data. 
                      All data is encrypted and stored securely.
                    </Alert>
                  </div>
                </Tab>

                <Tab eventKey="danger" title={
                  <span className="d-flex align-items-center text-danger">
                    <FiTrash2 className="me-2" />
                    Danger Zone
                  </span>
                }>
                  <div className="mt-4">
                    <Alert variant="danger">
                      <h5 className="alert-heading">⚠️ Proceed with Caution</h5>
                      <p className="mb-0">
                        These actions are irreversible. Please be certain before proceeding.
                      </p>
                    </Alert>

                    <Card className="border-danger">
                      <Card.Body>
                        <h6 className="text-danger fw-bold mb-3">
                          <FiTrash2 className="me-2" />
                          Delete Account
                        </h6>
                        <p className="text-muted mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button 
                          variant="outline-danger"
                          onClick={handleDeleteAccount}
                        >
                          Delete My Account
                        </Button>
                      </Card.Body>
                    </Card>

                    <Card className="border-warning mt-4">
                      <Card.Body>
                        <h6 className="text-warning fw-bold mb-3">Export Data</h6>
                        <p className="text-muted mb-4">
                          Download a copy of all your data for backup or transfer purposes.
                        </p>
                        <Button variant="outline-warning">
                          Export All Data
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsSection;