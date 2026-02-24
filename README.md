# Financial Literacy & Portfolio Tracker – All-in-One Financial Platform

## Overview
Financial Literacy & Portfolio Tracker is a comprehensive financial education and management platform built with **React** and **Firebase**.  
It addresses a common problem: financial tools are scattered everywhere — budget in one app, investments in another, tax calculations somewhere else, and financial education on YouTube. This platform brings everything into **one place**.

Users can learn about personal finance, track their spending, monitor investments, calculate taxes, and visualize their financial health — all with secure, encrypted storage.

---

## 📸 Project Snapshots

| Home Page | Login |
|:---:|:---:|
| ![Home Page](https://github.com/user-attachments/assets/cf4341f6-d63f-4387-9400-c9449adcd2a4) | ![Login](https://github.com/user-attachments/assets/c6c925ca-a9f8-40f2-98b5-9736e9be9f55) |

| Investment Tracker | Educational Modules |
|:---:|:---:|
| ![Investment Tracker](https://github.com/user-attachments/assets/ce2c1944-1e56-4272-9f8a-56ad58d5f1ff) | ![Educational Modules](https://github.com/user-attachments/assets/c6baa470-87a4-40f5-9690-5416f75e7c6e) |

---

## Key Features

### 1. Financial Education Hub
- Interactive modules covering:
  - Budgeting basics
  - Saving strategies
  - Investment fundamentals
  - Tax essentials
  - Retirement planning
  - Risk management
- Quizzes to test knowledge after each module.  
- Progress tracking through learning path.

### 2. Income & Expense Tracking
- Add, edit, delete transactions.  
- Categorize spending (Groceries, Rent, Transport, Entertainment, etc.).  
- Monthly and yearly views.  
- Spending patterns visualized with charts.

### 3. Savings Goals
- Set savings targets with deadlines.  
- Visual progress bars showing completion.  
- Automatic calculations of monthly contributions needed.  
- Milestone celebrations when goals are reached.

### 4. Investment Portfolio Tracker
- Track stocks, ETFs, crypto, and other assets.  
- Manual entry or API integration for live prices.  
- Performance metrics:
  - Total value
  - Gain/loss percentage
  - Asset allocation
- Historical performance charts.

### 5. Budget Planner
- Create monthly budgets by category.  
- Track actual spending vs budget.  
- Alerts when approaching limits.  
- Rollover options for unused budget.

### 6. Tax Calculator (South Africa Focus)
- Estimate annual tax liability.  
- Consider deductions and rebates.  
- Tax bracket visualizer.  
- What-if scenarios for financial planning.

### 7. Data Visualization
- Interactive charts for all financial data.  
- Net worth over time.  
- Spending breakdown by category.  
- Investment growth projections.  
- Savings goal progress.

### 8. Security & Privacy
- End-to-end encryption for sensitive financial data.  
- Firebase Authentication with email verification.  
- Optional biometric/mobile auth integration.  
- Data export functionality.

---

## Database Structure

### **Firestore Collections (Encrypted)**

| Collection | Fields | Description |
|------------|--------|-------------|
| `users` | `profile`, `settings`, `createdAt` | User preferences and profile |
| `transactions` | `amount`, `category`, `date`, `description`, `type` | Income/expense records |
| `savingsGoals` | `targetAmount`, `currentAmount`, `deadline`, `name` | Savings targets |
| `investments` | `assetType`, `quantity`, `purchasePrice`, `currentPrice` | Portfolio holdings |
| `budgets` | `category`, `allocated`, `spent`, `month` | Monthly budgets |
| `education` | `moduleId`, `completed`, `quizScores` | Learning progress |

### **Encryption**
- Sensitive fields encrypted client-side before storage.  
- Decryption only with user authentication.  
- Encryption keys never stored on server.

---

## Files and Structure
