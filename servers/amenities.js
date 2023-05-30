const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
const { Client } = require("pg");
const db = new Client({ connectionString: process.env.DATABASE6 });

db.connect();

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Routes

app.get("/api/amenities", (req, res) => {
  db.query("SELECT * FROM amenities;", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving amenities from database");
    }
    res.send(result.rows);
  });
});

app.get("/api/amenities/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT listing_amenities.id, amenities.amenity FROM listing_amenities JOIN amenities ON amenities.id = listing_amenities.amenityId WHERE listingId = $1",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving amenities from database");
      }
      res.send(result.rows);
    }
  );
});

app.get("/api/amenities/ten/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT listing_amenities.id, amenities.amenity FROM listing_amenities JOIN amenities ON amenities.id = listing_amenities.amenityId WHERE listingId = $1 LIMIT 10",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving amenities from database");
      }
      res.send(result.rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(process.env.DATABASE6);
  console.log(`Amenities Server is listening on port ${PORT}...`);
});
