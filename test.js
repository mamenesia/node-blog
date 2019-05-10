const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/node-js-test-blog');

Post.find({}, (error, post) => {
  console.log(error, post);
});

// Post.findById('5c98a196b52e4c24c489c191', (error, post) => {
//   console.log(error, post);
// });

// Post.findByIdAndUpdate('5c98a196b52e4c24c489c191', { title: 'My second blog post updated' }, (error, post) => {
//   console.log(error, post);
// });

// Post.remove({_id: '5c988001f5676720086706d5'}, (error, post) =>{
//   console.log(error, post);
// });

// Post.create ({
//   title: 'My second blog post',
//   description: 'Second Blog post description',
//   content: 'Second Lorem ipsum content'
// }, (error, post) => {
//   console.log(error, post);
// });

