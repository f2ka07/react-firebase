export interface User {
  id: string;
  email: string;
  displayName: string;
  phoneNumber: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  adminId: string;
  members: string[];
  contributionAmount: number;
  contributionFrequency: 'weekly' | 'monthly';
  balance: number;
}

export interface Contribution {
  id: string;
  groupId: string;
  userId: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed';
}

export interface Loan {
  id: string;
  groupId: string;
  userId: string;
  amount: number;
  interestRate: number;
  requestDate: Date;
  dueDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  repaymentSchedule: RepaymentSchedule[];
}

export interface RepaymentSchedule {
  date: Date;
  amount: number;
  status: 'pending' | 'paid';
}