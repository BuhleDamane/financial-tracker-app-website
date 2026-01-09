export interface Investment {
  id: string;
  type: 'stocks' | 'crypto' | 'pension' | 'retirement' | 'other';
  company: string;
  investmentSite: string;
  amount: number;
  dateInvested: string;
  numberOfStocks?: number;
  investmentTerm: 'short' | 'intermediate' | 'long';
  stockName: string;
  stockType: string;
  isTFSA: boolean;
}

export interface IncomeStream {
  id: string;
  company: string;
  position: string;
  startDate: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  description?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  type: 'non-negotiable' | 'negotiable';
  amount: number;
  allocatedAmount: number;
  status: 'green' | 'orange' | 'red';
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  progress: number;
}

export interface EducationTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'budgeting' | 'investing' | 'saving' | 'taxes';
}

// Mock Data
export const mockInvestments: Investment[] = [
  {
    id: '1',
    type: 'stocks',
    company: 'Standard Bank',
    investmentSite: 'EasyEquities',
    amount: 10000,
    dateInvested: '2024-01-15',
    numberOfStocks: 50,
    investmentTerm: 'long',
    stockName: 'Standard Bank Group',
    stockType: 'Equity',
    isTFSA: true
  },
  {
    id: '2',
    type: 'crypto',
    company: 'Bitcoin',
    investmentSite: 'Luno',
    amount: 5000,
    dateInvested: '2024-02-20',
    investmentTerm: 'intermediate',
    stockName: 'BTC',
    stockType: 'Cryptocurrency',
    isTFSA: false
  }
];

export const mockIncomeStreams: IncomeStream[] = [
  {
    id: '1',
    company: 'Tech Corp SA',
    position: 'Senior Developer',
    startDate: '2022-03-01',
    monthlyIncome: 45000,
    monthlyExpenses: 18000,
    description: 'Full-time employment'
  },
  {
    id: '2',
    company: 'Freelance Projects',
    position: 'Consultant',
    startDate: '2023-01-15',
    monthlyIncome: 15000,
    monthlyExpenses: 2000,
    description: 'Part-time consulting work'
  }
];

export const mockBudgetItems: BudgetItem[] = [
  { id: '1', category: 'Rent', type: 'non-negotiable', amount: 8000, allocatedAmount: 8000, status: 'green' },
  { id: '2', category: 'Food & Groceries', type: 'non-negotiable', amount: 4000, allocatedAmount: 3500, status: 'green' },
  { id: '3', category: 'Transport', type: 'non-negotiable', amount: 1500, allocatedAmount: 2000, status: 'orange' },
  { id: '4', category: 'Entertainment', type: 'negotiable', amount: 2000, allocatedAmount: 3000, status: 'red' },
  { id: '5', category: 'Shopping', type: 'negotiable', amount: 1500, allocatedAmount: 2500, status: 'red' },
];

export const mockGoals: Goal[] = [
  { id: '1', title: 'Emergency Fund', targetAmount: 50000, currentAmount: 40000, deadline: '2024-12-31', category: 'savings', progress: 80 },
  { id: '2', title: 'Student Loan Repayment', targetAmount: 20000, currentAmount: 9000, deadline: '2025-06-30', category: 'debt', progress: 45 },
  { id: '3', title: 'New Car', targetAmount: 150000, currentAmount: 25000, deadline: '2026-12-31', category: 'asset', progress: 17 },
];

export const educationTopics: EducationTopic[] = [
  {
    id: '1',
    title: 'Understanding Budgeting',
    description: 'Learn how to create and maintain a personal budget',
    content: 'Budgeting is the process of creating a plan to spend your money...',
    category: 'budgeting'
  },
  {
    id: '2',
    title: 'Introduction to Investing',
    description: 'Basics of stock market and investment strategies',
    content: 'Investing involves allocating money with the expectation of generating an income or profit...',
    category: 'investing'
  },
  {
    id: '3',
    title: 'Tax Basics in South Africa',
    description: 'Understanding SARS and tax obligations',
    content: 'In South Africa, the South African Revenue Service (SARS) is responsible for tax collection...',
    category: 'taxes'
  },
];