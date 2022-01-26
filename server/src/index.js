const dotenv = require('dotenv');

// Init env so files can use it
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { LIMIT_UPLOAD, MONGO_URI } = require('./constants');
const connectToRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Init configs
app.use(express.json({ limit: LIMIT_UPLOAD, extended: true }));
app.use(express.urlencoded({ limit: LIMIT_UPLOAD, extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to routes
connectToRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome to fire land app 👋');
});

// HTTP logger
app.use(morgan('dev'));

// Connect to db
const connectToDb = () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to DB 🍕');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} 🍔`);
    });
  } catch (error) {
    console.log(`Server got an error 👉 ${error}`);
  }
};

// Call db
connectToDb();
