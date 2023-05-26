const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const dotenv = require("dotenv").config();
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  connectionString: process.env.DATABASE,
});

app.use(express.json());
app.use(express.static("client"));
app.use(cors());

app.get("/api/about/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT hostId, id, description FROM listings WHERE hostId = $1;",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving about details from database");
      }
      res.send(result.rows);
    }
  );
});

app.get("/api/amenities", (req, res) => {
  pool.query("SELECT * FROM amenities;", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving amenities from database");
    }
    res.send(result.rows);
  });
});

app.get("/api/amenities/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
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
  pool.query(
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

app.get("/api/gallery/photo_url/:id", (req, res) => {
  const listingId = req.params.id;
  pool.query(
    "SELECT photo_url FROM listing_photos WHERE listingid = $1",
    [listingId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving gallery");
      } else {
        const photoUrls = result.rows.map((row) => row.photo_url);
        res.send(photoUrls);
      }
    }
  );
});

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

app.get("/api/location/:id", (req, res) => {
  let id = req.params.id;
  pool.query(
    `SELECT latitude, longitude FROM locations WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving location from database");
      }
      res.json(result.rows[0]);
    }
  );
});

app.get("/api/location/description/:id", (req, res) => {
  let id = req.params.id;
  pool.query(
    `SELECT description FROM listings WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Error retrieving location description from database");
      }
      res.json(result.rows[0]);
    }
  );
});

app.get("/api/overview", (req, res) => {
  const listingId = req.params.id;
  pool.query("SELECT * FROM overview", [listingId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving gallery");
    } else {
      const photoUrls = result.rows.map((row) => row.photo_url);
      res.send(photoUrls);
    }
  });
});

app.get("/api/overview//:id", (req, res) => {
  const listingId = req.params.id;
  pool.query(
    "SELECT photo_url FROM listing_photos WHERE listingid = $1",
    [listingId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving gallery");
      } else {
        const photoUrls = result.rows.map((row) => row.photo_url);
        res.send(photoUrls);
      }
    }
  );
});

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

app.get("/api/title/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
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

app.listen(PORT, () => {
  console.log("Reviews server is listening on port 3005...");
});
