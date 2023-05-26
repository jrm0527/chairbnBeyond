import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "./Map.module.css";
const apiKey = import.meta.env.VITE_API_KEY;

function Map(props) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [description, setDescription] = useState([]);
  const [cityAndState, setCityAndState] = useState("");

  function calculateCircleRadius(zoom) {
    // Adjust the calculation based on your desired behavior
    return Math.pow(2, 15 - zoom) * 110;
  }

  useEffect(() => {
    fetch(`http://localhost:3005/api/location/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setLocation({ latitude: data.latitude, longitude: data.longitude });
        fetch(
          `https://geocode.maps.co/reverse?lat=${data.latitude}&lon=${data.longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            const city = data.address.city;
            const state = data.address.state;
            console.log(city, state);
            setCityAndState(`${city}, ${state}`);
          });
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
        });
        loader.load().then(() => {
          const google = window.google;
          var styles = [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#dddddd" }, { weight: 1 }],
            },
            {
              featureType: "road",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit.station",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#b3d1ff" }],
            },
            {
              featureType: "water",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }],
            },
          ];

          const location = data;
          const map = new google.maps.Map(
            document.getElementById("map-container"),
            {
              center: {
                lat: Number(data.latitude),
                lng: Number(data.longitude),
              },
              zoom: 13,
              styles: styles,
              gestureHandling: "greedy", // Disable Ctrl + scroll zoom
              mapTypeControl: false,
              fullscreenControl: false,
              scrollwheel: false,
              streetViewControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
              zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
            }
          );

          const circle = new google.maps.Circle({
            map: map,
            center: map.getCenter(),
            radius: calculateCircleRadius(map.getZoom()) * 2, // Calculate initial circle radius based on the initial zoom level
            fillColor: "#FFC0CB", // Light pink color
            fillOpacity: 0.8, // Adjust the opacity of the circle as needed
            strokeWeight: 0, // Set the stroke weight to 0 to hide the circle border
          });

          // Create a marker for the house icon
          const houseMarker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            icon: {
              url: "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-3/256/house-256.png", // Replace with the URL of your house icon
              scaledSize: new google.maps.Size(30, 30), // Adjust the size of the icon as needed
              anchor: new google.maps.Point(15, 15), // Adjust the anchor point to center the icon on the circle
            },
            draggable: false, // Set to true if you want the marker to be draggable
            animation: google.maps.Animation.DROP, // Add animation to the marker (optional)
          });

          // Create an info window for the popup
          const infoWindow = new google.maps.InfoWindow({
            content: "Exact location provided after booking",
          });

          // Show the info window when hovering over the house marker
          google.maps.event.addListener(houseMarker, "mouseover", () => {
            infoWindow.open(map, houseMarker);
          });

          // Hide the info window when the mouse leaves the house marker
          google.maps.event.addListener(houseMarker, "mouseout", () => {
            infoWindow.close();
          });
          // Update the circle position and size when the map is moved or zoomed
          google.maps.event.addListener(map, "center_changed", () => {
            houseCircle.setCenter(map.getCenter());
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/api/location/description/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setDescription(data.description);
      });
  }, []);

  function showMore() {
    console.log("show more func");
  }

  return (
    <>
      <div className={styles["mainContainer"]}>
        <div id="locationInfo" className={styles["locationInfo"]}>
          <h2>Where you'll be</h2>
          <div id="map-container" className={styles["map-container"]}></div>
          <h3>{cityAndState}</h3>
          <p>{description}</p>
          <span onClick={showMore}>Show more &gt;</span>
        </div>
      </div>
    </>
  );
}

export default Map;
