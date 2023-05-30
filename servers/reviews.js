const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const dotenv = require("dotenv").config();
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  connectionString: process.env.DATABASE2,
});

app.use(express.json());
app.use(express.static("client"));
app.use(cors());

app.get("/api/reviews", (req, res) => {
  pool.query(
    "SELECT reviews.rating, reviews.review, users.fname, users.photo_url, bookings.enddate FROM reviews JOIN users ON users.id = reviews.userid JOIN bookings ON bookings.id = reviews.bookingid WHERE reviews.listingid = 1;",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error querying the database");
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/api/reviews/:id", (req, res) => {
  const taskId = req.params.id;
  pool.query(
    "SELECT reviews.rating, reviews.review, users.fname, users.photo_url, bookings.enddate FROM reviews JOIN users ON users.id = reviews.userid JOIN bookings ON bookings.id = reviews.bookingid WHERE reviews.listingid =  $1",
    [taskId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Reviews server is listening on port 3005...");
});
