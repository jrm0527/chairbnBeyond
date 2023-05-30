const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE3 });

pool.connect();

//Middleware
app.use(bodyParser.json());
app.use(express.json());

//Routes

app.get("/api/location/:id", (req, res) => {
    let id = req.params.id
    pool.query(`SELECT latitude, longitude FROM locations WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving location from database");
    }
    res.json(result.rows[0]);
  });
});

app.get("/api/location/description/:id", (req, res) => {
  let id = req.params.id
  pool.query(`SELECT description FROM listings WHERE id = ${id}`, (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error retrieving location description from database");
  }
  res.json(result.rows[0]);
});
});

app.listen(PORT, () => {
  console.log(`Map server is listening on port ${PORT}`);
});
