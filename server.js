const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');

const app = express();
const port = 3001;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'fullstack'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"], // React app's address
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 86400000 // 24 hours
  }
}));

// Login endpoint
app.post('/login', (req, res) => {
  const { Email, Password } = req.body;
  connection.query(
    'SELECT * FROM customer WHERE email = ? AND password = ?',
    [Email, Password],
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        req.session.user = results[0];
        res.json({ loggedIn: true, user: req.session.user });
      } else {
        res.json({ loggedIn: false, message: "User not found" });
      }
    }
  );
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.json({ loggedOut: true });
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { Email, Password, Username } = req.body;
  connection.query(
    'INSERT INTO Customer (Email, Password, Username) VALUES (?, ?, ?)',
    [Email, Password, Username],
    (error, results) => {
      if (error) {
        console.error("MySQL error:", error);
        res.json({ success: false, message: "Signup failed" });
      } else {
        res.json({ success: true, message: "Signup successful" });
      }
    }
  );
});

// Check if user is logged in
app.get('/isLoggedIn', (req, res) => {
  if (req.session.user) {
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

app.get('/classes', (req, res) => {
  const sqlQuery = `
    SELECT 
      ClassYoga.classID, 
      ClassYoga.title, 
      ClassYoga.time, 
      ClassYoga.date, 
      ClassYoga.duration, 
      ClassYoga.description, 
      CONCAT(Coach.firstName, ' ', Coach.lastName) AS instructorName
    FROM ClassYoga
    JOIN Coach ON ClassYoga.coachID = Coach.coachID;
  `;

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Failed to fetch classes with instructor names:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});


// Endpoint to book a class
app.post('/bookClass', (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, message: "User not logged in" });
  }
  
  const { classID } = req.body;
  const customerID = req.session.user.customerID;

  connection.query(
    'INSERT INTO Booking (classID, customerID) VALUES (?, ?)',
    [classID, customerID],
    (error) => {
      if (error) {
        console.error("Error booking class:", error);
        res.json({ success: false, message: "Failed to book class" });
      } else {
        res.json({ success: true, message: "Class booked successfully" });
      }
    }
  );
});

// Endpoint to fetch booked classes
app.get('/bookedClasses', (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, message: "User not logged in" });
  }

  const customerID = req.session.user.customerID;

  connection.query(
    'SELECT ClassYoga.* FROM ClassYoga JOIN Booking ON ClassYoga.classID = Booking.classID WHERE Booking.customerID = ?',
    [customerID],
    (error, results) => {
      if (error) {
        console.error("Failed to fetch booked classes:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results);
      }
    }
  );
});

app.post('/cancelBooking', (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, message: "User not logged in" });
  }

  const { classID } = req.body;
  const customerID = req.session.user.customerID;

  console.log(`Attempting to cancel booking for classID: ${classID} and customerID: ${customerID}`); // Debug log

  connection.query(
    'DELETE FROM Booking WHERE classID = ? AND customerID = ?',
    [classID, customerID],
    (error, results) => {
      if (error) {
        console.error("Error canceling booking:", error);
        res.status(500).json({ success: false, message: "Failed to cancel booking", error: error.sqlMessage });
      } else {
        if (results.affectedRows > 0) {
          res.json({ success: true, message: "Booking canceled successfully" });
        } else {
          res.json({ success: false, message: "Failed to cancel booking or booking not found" });
        }
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
