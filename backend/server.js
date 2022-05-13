const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/ErrorMiddleware');
const connectDB = require('./config/DB');

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/GoalRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));