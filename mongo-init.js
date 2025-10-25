// MongoDB initialization script
db = db.getSiblingDB('expense-tracker');

// Create collections
db.createCollection('users');
db.createCollection('expenses');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.expenses.createIndex({ "user": 1, "date": -1 });
db.expenses.createIndex({ "user": 1, "category": 1 });
db.expenses.createIndex({ "user": 1, "amount": -1 });

print('Database initialized successfully');


