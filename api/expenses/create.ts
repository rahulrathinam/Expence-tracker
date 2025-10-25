import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Expense from '../../backend/src/models/Expense';
import { connectDB } from '../../backend/src/utils/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Authentication
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    // Validation
    await body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters').run(req);
    await body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0').run(req);
    await body('category').isIn([
      'Food & Dining', 'Transportation', 'Entertainment', 'Shopping',
      'Healthcare', 'Education', 'Bills & Utilities', 'Travel', 'Other'
    ]).withMessage('Invalid category').run(req);
    await body('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters').run(req);
    await body('date').optional().isISO8601().withMessage('Date must be a valid ISO date').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, amount, category, description, date } = req.body;

    const expense = new Expense({
      title,
      amount,
      category,
      description,
      date: date || new Date(),
      user: userId
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: { expense }
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating expense'
    });
  }
}
