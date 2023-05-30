import { faker } from "@faker-js/faker";
import { writeFile } from "fs";

// INSERT INTO users(fname, lname, email, password, photo_url) VALUES ('Archibald', 'McTickleberry', 'bartholomew.mctickleberry@gmail.com', 'password', 'https://a0.muscache.com/im/pictures/user/cd1c0777-f3b3-40a3-8dab-c96a5cd2efef.jpg?im_w=240');
function popUsers(n) {
  let str = "fname, lname, email, password, photo_url \n";
  for (let i = 0; i <= n; i++) {
    str += `${faker.person.firstName()},${faker.person.lastName()},${faker.internet.email()},${faker.internet.password()},https://a0.muscache.com/im/pictures/user/cd1c0777-f3b3-40a3-8dab-c96a5cd2efef.jpg?im_w=240 \n`;
  }
  return str;
}

// console.log(popUsers(10));

// INSERT INTO locations (latitude, longitude, city) VALUES (48.230164, -101.291199, 'minot');
function popLocations(n) {
  let str = "latitude, longitude, city\n";
  for (let i = 0; i <= n; i++) {
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();
    const city = faker.location.city();

    str += `${latitude},${longitude},'${city}'\n`;
  }
  return str;
}

// console.log(popLocations(10));

// INSERT INTO amenity_types (amenity_type) VALUES ('Not Included');
function popAmenityTypes(n) {
  let str = "amenity_type\n";
  for (let i = 0; i <= n; i++) {
    str += "'Not Included'\n";
  }
  return str;
}

// INSERT INTO amenities (amenity, typeId) VALUES ('Air conditioning', 8);
function popAmenities(n) {
  let str = "amenity, typeId\n";
  for (let i = 0; i <= n; i++) {
    const amenity = faker.word.adjective();
    const typeId = faker.number.int({ min: 1, max: 14 });

    str += `'${amenity}', ${typeId}\n`;
  }
  return str;
}

// console.log(popAmenities(10));

// INSERT INTO hosts(userId, about) VALUES (1, 'Why not Minot. Freezins the reason.');
function popHosts(n) {
  let str = "userId, about\n";
  for (let i = 0; i <= n; i++) {
    const userId = faker.number.int({ min: 1, max: 10 });
    const about = faker.lorem.sentence();

    str += `${userId}, '${about}'\n`;
  }
  return str;
}

// console.log(popHosts(10));

// INSERT INTO listings(title, description, price, locationid, hostId) VALUES ('2 Bedroom House near Minot AFB', 'Historic House in downtown Minot', 100, 1, 1);
function popListings(n) {
  let str = "title, description, price, locationid, hostId\n";
  for (let i = 0; i <= n; i++) {
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const price = faker.number.int({ min: 10, max: 100, precision: 0.01 });
    const locationid = faker.number.int({ min: 1, max: 4 });
    const hostId = faker.number.int({ min: 1, max: 4 });

    str += `'${title}', '${description}', ${price}, ${locationid}, ${hostId}\n`;
  }
  return str;
}

// console.log(popListings(10));

// INSERT INTO listing_amenities(listingId, amenityId) VALUES (1, 1);
function popListing_amenities(n) {
  let str = "listingid, amenityid \n";
  for (let i = 0; i <= n; i++) {
    const listingId = faker.number.int({ min: 1, max: 4 });
    const amenityId = faker.number.int({ min: 1, max: 43 });
    str += `${listingId}, ${amenityId} \n`;
  }
  return str;
}

// console.log(popListing_amenities(10));

// INSERT INTO bookings(listingId, userId, startDate, endDate, numGuests) VALUES (1, 1, '2018-01-01', '2018-01-03', 2);
function popBookings(n) {
  let str = "listingId, userId, startDate, endDate, numGuests\n";
  for (let i = 0; i <= n; i++) {
    const listingId = faker.number.int({ min: 1, max: 15 });
    const userId = faker.number.int({ min: 1, max: 10 });
    const startDate = faker.date.past().toISOString().split("T")[0];
    const endDate = faker.date.future().toISOString().split("T")[0];
    const numGuests = faker.number.int({ min: 1, max: 10 });

    str += `${listingId}, ${userId}, '${startDate}', '${endDate}', ${numGuests}\n`;
  }
  return str;
}

// console.log(popBookings(10));

//  INSERT INTO reviews(listingId, userId, review, rating, cleanliness, communication, checkin, accuracy, location, value, bookingId) VALUES (1, 1, 'This Minot Chairbnb was almost perfect, but I could not find the remote control to pause the beautiful North Dakota sunset. Please send a pause button ASAP!', 4, 5, 5, 5, 5, 5,5, 1);
function popReviews(n) {
  let str =
    "listingId, userId, review, rating, cleanliness, communication, checkin, accuracy, location, value, bookingId\n";
  for (let i = 0; i <= n; i++) {
    const listingId = faker.number.int({ min: 1, max: 4 });
    const userId = faker.number.int({ min: 1, max: 10 });
    const review = faker.lorem.paragraph();
    const rating = faker.number.int({ min: 1, max: 5 });
    const cleanliness = faker.number.int({ min: 1, max: 5 });
    const communication = faker.number.int({ min: 1, max: 5 });
    const checkin = faker.number.int({ min: 1, max: 5 });
    const accuracy = faker.number.int({ min: 1, max: 5 });
    const location = faker.number.int({ min: 1, max: 5 });
    const value = faker.number.int({ min: 1, max: 5 });
    const bookingId = faker.number.int({ min: 1, max: 23 });

    str += `${listingId}, ${userId}, '${review}', ${rating}, ${cleanliness}, ${communication}, ${checkin}, ${accuracy}, ${location}, ${value}, ${bookingId}\n`;
  }
  return str;
}

// console.log(popReviews(10));

// INSERT INTO listing_photos (listingId, photo_url) VALUES (1, 'https://na.rdcpix.com/625946635/a545dc497c1d4e1385851ca5e12f5a14w-c0rd-w832_h468_r4_q80.jpg');

function popListingPhotos(n) {
  let str = "listingId, photo_url\n";
  for (let i = 0; i <= n; i++) {
    const listingId = faker.number.int({ min: 1, max: 4 });
    const photoUrl = faker.image.url();
    str += `${listingId}, '${photoUrl}'\n`;
  }
  return str;
}

// console.log(popListingPhotos(10));

function csvinator(n) {
  writeFile("csv/test_users.csv", popUsers(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_locs.csv", popLocations(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_amenity_types.csv", popAmenityTypes(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_amenities.csv", popAmenities(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_hosts.csv", popHosts(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_listings.csv", popListings(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile(
    "csv/test_listing_amenities.csv",
    popListing_amenities(n),
    (err) => {
      if (err) {
        console.log("not cool");
      } else {
        console.log("cool");
      }
    }
  );
  writeFile("csv/test_bookings.csv", popBookings(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_reviews.csv", popReviews(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
  writeFile("csv/test_listing_photos.csv", popListingPhotos(n), (err) => {
    if (err) {
      console.log("not cool");
    } else {
      console.log("cool");
    }
  });
}

csvinator(1000);
