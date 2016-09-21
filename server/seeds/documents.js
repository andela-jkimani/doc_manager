var mongoose = require('mongoose');

module.exports = [
  // {
  //   _id: mongoose.mongo.ObjectId('577b1e7bbcc1fe98df352493'),
  //   title: 'Harry Potter and the Prisoner of Azkaban',
  //   content: 'Harry Potter\'s uncle Sirius Black was an animangus and could turn into a dog',
  //   accessType: 'public',
  //   genre: 'fiction',
  //   createdAt: '12-05-1994'
  // }
  {
    title: 'Americanah',
    content: 'Nigerian lady going to America, and her struggles with life and love',
    accessType: 'public',
    genre: 'fiction',
    createdAt: '18-4-2004'
  },
  {
    title: 'Hello World',
    content: 'Basics of programming in Javascript',
    accessType: 'public',
    genre: 'programming',
    createdAt: '30-2-2016'
  },
  {
    title: 'My Life in Crime',
    content: 'Personal journal showing my everyday life in crime',
    accessType: 'private',
    genre: 'reality',
    createdAt: '21-3-2014',
    modifiedAt: '20-09-2016'
  },
  {
    title: 'Hello Again',
    content: 'What would you like to be when you grow up?',
    accessType: 'private',
    genre: 'reality',
    createdAt: '19-3-2010'
  }
];
