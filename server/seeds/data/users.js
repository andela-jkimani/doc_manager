var mongoose = require('mongoose');

module.exports = [
  {
    _id: mongoose.Types.ObjectId('57e8333438229616d450d37e'),
    username: 'jacky',
    name: { firstName: 'jacky', lastName: 'kimani' },
    email: 'jacky@gmail.com',
    password: 'jacky',
    role: 'user'
  },
  {
    _id: mongoose.Types.ObjectId('57e936807700ef1f31b3f8e0'),
    username: 'maggie',
    name: { firstName: 'maggie', lastName: 'kimani' },
    email: 'maggie@gmail.com',
    password: 'maggie',
    role: 'user'
  },
  {
    _id: mongoose.Types.ObjectId('57e9373878d4771f48c956b9'),
    username: 'sylvia',
    name: { firstName: 'sylvia', lastName: 'kimani' },
    email: 'sylvia@gmail.com',
    password: 'sylvia',
    role: 'admin'
  },
  {
    _id: mongoose.Types.ObjectId('57ea2501f31e4807aec868f5'),
    username: 'eunice',
    name: { firstName: 'eunice', lastName: 'kimani' },
    email: 'eunice@gmail.com',
    password: 'eunice',
    role: 'user'
  },
  {
    _id: mongoose.Types.ObjectId('57ea253f498d0607b4f11230'),
    username: 'kevin',
    name: { firstName: 'kevin', lastName: 'gichia' },
    email: 'kevin@gmail.com',
    password: 'kevin',
    role: 'user'
  }
];
