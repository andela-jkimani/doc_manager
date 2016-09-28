var mongoose = require('mongoose');

module.exports = [
  {
    _id: mongoose.Types.ObjectId('57ea31a8b9b2a908071ed937'),
    ownerId: mongoose.Types.ObjectId('57e8333438229616d450d37e'),
    title: 'Harry Potter and the Prisoner of Azkaban',
    content: 'Harry Potter\'s uncle Sirius Black was an animangus and could turn into a dog',
    accessType: 'public',
    genre: 'fiction',
    createdAt: '12-05-1994'
  },
  {
    _id: mongoose.Types.ObjectId('57ea326a3f2e3408554e8f5a'),
    ownerId: mongoose.Types.ObjectId('57e9373878d4771f48c956b9'),
    title: 'Americanah',
    content: 'Nigerian lady going to America, and her struggles with life and love',
    accessType: 'public',
    genre: 'fiction',
    createdAt: '12-02-1993'
  },
  {
    _id: mongoose.Types.ObjectId('57ea33374031bd086d7d3809'),
    ownerId: mongoose.Types.ObjectId('57e936807700ef1f31b3f8e0'),
    title: 'Hello World',
    content: 'Basics of programming in Javascript',
    accessType: 'public',
    genre: 'programming',
    createdAt: '30-2-2016'
  },
  {
    _id: mongoose.Types.ObjectId('57ea33cb2902510880b791a0'),
    ownerId: mongoose.Types.ObjectId('57ea2501f31e4807aec868f5'),
    title: 'My Life in Crime',
    content: 'Personal journal showing my everyday life in crime',
    accessType: 'private',
    genre: 'reality',
    createdAt: '21-3-2014',
    modifiedAt: '20-09-2016'
  },
  {
    _id: mongoose.Types.ObjectId('57ea342d78f740088918f6b8'),
    ownerId: mongoose.Types.ObjectId('57ea253f498d0607b4f11230'),
    title: 'Hello Again',
    content: 'What would you like to be when you grow up?',
    accessType: 'private',
    genre: 'reality',
    createdAt: '19-3-2010'
  }
];
