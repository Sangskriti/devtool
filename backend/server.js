
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const toolRoutes = require('./routes/toolRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/', toolRoutes);


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
