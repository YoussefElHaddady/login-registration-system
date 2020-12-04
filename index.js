const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, () =>
  console.log('connected to DB!')
);

// Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
