const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;
const { Client } = require("pg");
const db = new Client({ connectionString: process.env.DATABASE1 });
db.connect();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Route

app.get("/api/title/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT l.id, l.title, l.price, loc.city, ROUND(AVG(r.rating), 2) AS average_rating, SUM(1) AS review_count, json_object_agg(r.id::text, r.review) AS reviews FROM listings l LEFT JOIN reviews r ON l.id = r.listingId JOIN locations loc ON l.locationid = loc.id WHERE l.id = $1 GROUP BY l.id, l.title, loc.city ORDER BY l.id;",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving title info from database");
      }
      res.send(result.rows);
    }
  );
});

//start the server
app.listen(PORT, () => {
  console.log(`Titlebar server is listening on port ${PORT}...`);
});
