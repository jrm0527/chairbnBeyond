const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4001;
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE4 });

pool.connect();

//Middleware
app.use(bodyParser.json());
app.use(express.json());

//Routes

//GET USERS NAME
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT fname, lname FROM users WHERE id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving users from the database");
      }
      res.json(result.rows[0]);
    }
  );
});

//ROUTE TO GET about host
app.get("/api/hosts/about/:userId", (req, res) => {
  const userId = req.params.userId;

  pool.query(
    "SELECT * FROM hosts WHERE userId = $1",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving hosts from database");
      }
      res.json(result.rows[0]);
    }
  );
});

app.get("/api/reviews", (req, res) => {
  const userId = req.params.userId;

  pool.query("SELECT * FROM reviews", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving hosts from database");
    }
    res.json(result.rows);
  });
});
//get host profile pic
app.get("/api/hosts/photo/:id", (req, res) => {
  const id = req.params.id;

  pool.query(`SELECT photo_url FROM users WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving host photo url from database");
    }
    res.json(result.rows[0]);
  });
});

// app.get("/api/location/description", (req, res) => {
//   pool.query("SELECT description FROM listings", (err, result) => {
//   if (err) {
//     console.log(err);
//     res.status(500).send("Error retrieving location description from database");
//   }
//   res.json(result.rows[0]);
// });
// });

app.listen(PORT, () => {
  console.log(`Host server (DB4) is listening on port ${PORT}`);
});
