export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
}

export interface ExpenseStats {
  totalExpenses: {
    total: number;
    count: number;
  };
  expensesByCategory: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  monthlyExpenses: Array<{
    _id: {
      year: number;
      month: number;
    };
    total: number;
    count: number;
  }>;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ExpenseContextType {
  expenses: Expense[];
  stats: ExpenseStats | null;
  loading: boolean;
  fetchExpenses: (params?: ExpenseFilters) => Promise<void>;
  fetchStats: (startDate?: string, endDate?: string) => Promise<void>;
  createExpense: (data: ExpenseFormData) => Promise<void>;
  updateExpense: (id: string, data: ExpenseFormData) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export interface ExpenseFilters {
  page?: number;
  limit?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    msg: string;
    param: string;
    location: string;
  }>;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Education',
  'Bills & Utilities',
  'Travel',
  'Other'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];


