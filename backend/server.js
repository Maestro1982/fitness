const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');

// Express app
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to db
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
