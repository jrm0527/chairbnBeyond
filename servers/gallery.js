const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3010;
const { Client } = require("pg");
const db = new Client({ connectionString: process.env.DATABASE5 });
db.connect();
const cors = require("cors");


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/api/gallery", (req, res) => {
    db.query("SELECT * FROM listing_photos", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving gallery");
        } else {
            res.send(result.rows);
        }
    });
});

// app.get("/api/gallery/photo_url/1", (req, res) => {
//     const listingId = 1;
//     db.query(
//       "SELECT photo_url FROM listing_photos WHERE listingid = $1",
//       [listingId],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("Error retrieving gallery");
//         } else {
//           const photoUrls = result.rows.map((row) => row.photo_url);
//           res.send(photoUrls);
//         }
//       }
//     );
//   });

  app.get("/api/gallery/photo_url/:id", (req, res) => {
    const listingId = req.params.id;
    db.query(
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

//   app.get("/api/gallery/photo_url/3", (req, res) => {
//     const listingId = 3;
//     db.query(
//       "SELECT photo_url FROM listing_photos WHERE listingid = $1",
//       [listingId],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("Error retrieving gallery");
//         } else {
//           const photoUrls = result.rows.map((row) => row.photo_url);
//           res.send(photoUrls);
//         }
//       }
//     );
//   });


app.listen(PORT, () => {
    console.log(`Gallery server is listening on port ${PORT}...`);
  });
  