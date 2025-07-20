
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const toolRoutes = require('./routes/toolRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

import {fileURLToPath} from 'url';
const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/', toolRoutes);

app.use(express.static(path.join(_dirname,'../frontend/dist')));
app.get("*",(_,res)=>{
  res.sendFile(path.resolve(_dirname,'../frontend/dist/index.html'));
})


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
