import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { FiUser, FiLock, FiBell, FiShield, FiTrash2, FiSave, FiAlertTriangle } from 'react-icons/fi';

const SettingsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+27 123 456 7890',
    dateOfBirth: '1990-01-01',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    budgetAlerts: true,
    investmentAlerts: true,
    goalReminders: true,
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
            <div style={{ paddingLeft: '40px' }}>
              <h1 className="ubuntu-font fw-bold" style={{ color: '#2c3e50' }}>
                Account Settings
              </h1>
              <p className="text-muted roboto-font">
                Manage your account preferences and security settings
              </p>
            </div>
            <div
              className="p-3 rounded-circle"
              style={{ backgroundColor: '#e0f7f4', color: '#17a2b8' }}
            >
              <FiUser size={30} />
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
                className="mb-4 settings-tab"
              >
                <Tab
                  eventKey="profile"
                  title={
                    <span className="d-flex align-items-center roboto-font">
                      <FiUser className="me-2" />
                      Profile
                    </span>
                  }
                >
                  <div className="mt-4 settings-form">
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                          <Button
                            className="btn-custom roboto-font"
                            style={{ border: '1.5px solid #6c757d', color: '#6c757d', backgroundColor: 'transparent' }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="btn-custom btn-primary-custom text-white roboto-font"
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

                <Tab
                  eventKey="security"
                  title={
                    <span className="d-flex align-items-center roboto-font">
                      <FiLock className="me-2" />
                      Security
                    </span>
                  }
                >
                  <div className="mt-4 settings-form">
                    <Row className="g-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="roboto-font fw-medium">Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder=" "
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mt-3 form-switch">
                          <Form.Check
                            type="switch"
                            id="twoFactorEnabled"
                            name="twoFactorEnabled"
                            label={<span className="roboto-font">Enable Two-Factor Authentication</span>}
                            checked={formData.twoFactorEnabled}
                            onChange={handleInputChange}
                          />
                          <Form.Text className="text-muted roboto-font">
                            Add an extra layer of security to your account
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                          <Button
                            className="btn-custom btn-primary-custom text-white roboto-font"
                            onClick={handleChangePassword}
                          >
                            Change Password
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>

                <Tab
                  eventKey="notifications"
                  title={
                    <span className="d-flex align-items-center roboto-font">
                      <FiBell className="me-2" />
                      Notifications
                    </span>
                  }
                >
                  <div className="mt-4 form-switch">
                    <h6 className="ubuntu-font fw-bold mb-3" style={{ color: '#2c3e50' }}>
                      Notification Preferences
                    </h6>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="emailNotifications"
                        name="emailNotifications"
                        label={<span className="roboto-font">Email Notifications</span>}
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted roboto-font">
                        Receive important updates via email
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="pushNotifications"
                        name="pushNotifications"
                        label={<span className="roboto-font">Push Notifications</span>}
                        checked={formData.pushNotifications}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted roboto-font">
                        Get real-time updates on your device
                      </Form.Text>
                    </Form.Group>

                    <div className="mt-4">
                      <h6 className="ubuntu-font fw-bold mb-3" style={{ color: '#2c3e50' }}>Alert Types</h6>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="budgetAlerts"
                          name="budgetAlerts"
                          label={<span className="roboto-font">Budget Alerts</span>}
                          checked={formData.budgetAlerts}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted roboto-font">
                          Get notified when approaching budget limits
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="investmentAlerts"
                          name="investmentAlerts"
                          label={<span className="roboto-font">Investment Alerts</span>}
                          checked={formData.investmentAlerts}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted roboto-font">
                          Receive updates on investment performance
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="goalReminders"
                          name="goalReminders"
                          label={<span className="roboto-font">Goal Reminders</span>}
                          checked={formData.goalReminders}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted roboto-font">
                          Reminders for goal contributions
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </div>
                </Tab>

                <Tab
                  eventKey="privacy"
                  title={
                    <span className="d-flex align-items-center roboto-font">
                      <FiShield className="me-2" />
                      Privacy
                    </span>
                  }
                >
                  <div className="mt-4 form-switch">
                    <Form.Group className="mb-4">
                      <Form.Check
                        type="switch"
                        id="dataSharing"
                        name="dataSharing"
                        label={<span className="roboto-font">Allow Anonymous Data Sharing</span>}
                        checked={formData.dataSharing}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted roboto-font">
                        Help improve our services by sharing anonymous usage data
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="switch"
                        id="analyticsEnabled"
                        name="analyticsEnabled"
                        label={<span className="roboto-font">Enable Analytics</span>}
                        checked={formData.analyticsEnabled}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted roboto-font">
                        Allow us to collect analytics to improve your experience
                      </Form.Text>
                    </Form.Group>

                    <div
                      className="p-3 rounded d-flex align-items-start gap-3"
                      style={{ backgroundColor: '#e0f7f4', border: '1px solid #b2ebf2' }}
                    >
                      <FiShield size={20} style={{ color: '#17a2b8', flexShrink: 0, marginTop: '2px' }} />
                      <p className="roboto-font mb-0" style={{ color: '#2c3e50' }}>
                        <strong>Your privacy matters:</strong> We never sell your personal data. All data is encrypted and stored securely.
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab
                  eventKey="danger"
                  title={
                    <span className="d-flex align-items-center roboto-font" style={{ color: '#ff6b6b' }}>
                      <FiTrash2 className="me-2" />
                      Danger Zone
                    </span>
                  }
                >
                  <div className="mt-4">
                    <div
                      className="p-3 rounded d-flex align-items-start gap-3 mb-4"
                      style={{ backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}
                    >
                      <FiAlertTriangle size={20} style={{ color: '#ff6b6b', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <p className="ubuntu-font fw-bold mb-1" style={{ color: '#721c24' }}>Proceed with Caution</p>
                        <p className="roboto-font mb-0" style={{ color: '#721c24' }}>
                          These actions are irreversible. Please be certain before proceeding.
                        </p>
                      </div>
                    </div>

                    <Card className="border-0 shadow-sm danger-zone-card mb-4">
                      <Card.Header className="bg-transparent">
                        <h6 className="ubuntu-font fw-bold mb-0" style={{ color: '#ff6b6b' }}>
                          <FiTrash2 className="me-2" />
                          Delete Account
                        </h6>
                      </Card.Header>
                      <Card.Body>
                        <p className="text-muted roboto-font mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button
                          className="btn-custom roboto-font"
                          style={{ border: '1.5px solid #ff6b6b', color: '#ff6b6b', backgroundColor: 'transparent' }}
                          onClick={handleDeleteAccount}
                        >
                          Delete My Account
                        </Button>
                      </Card.Body>
                    </Card>

                    <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: '4px solid #ffc107' }}>
                      <Card.Body>
                        <h6 className="ubuntu-font fw-bold mb-3" style={{ color: '#ffc107' }}>Export Data</h6>
                        <p className="text-muted roboto-font mb-4">
                          Download a copy of all your data for backup or transfer purposes.
                        </p>
                        <Button
                          className="btn-custom roboto-font"
                          style={{ border: '1.5px solid #ffc107', color: '#ffc107', backgroundColor: 'transparent' }}
                        >
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