const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`${process.env.MONGDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});