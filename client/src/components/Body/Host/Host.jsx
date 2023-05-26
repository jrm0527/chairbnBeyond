import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMedal } from "@fortawesome/free-solid-svg-icons";
import styles from "./Host.module.css";

function HostInfo(props) {
  const [name, setName] = useState([]);
  const [numOfReviews, setNumOfReviews] = useState([]);
  const [aboutHost, setAboutHost] = useState([]);
  const [hostPhoto, setHostPhoto] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/api/users/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.fname);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/api/hosts/about/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setAboutHost(data.about);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/api/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setNumOfReviews(data.length);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/api/hosts/photo/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setHostPhoto(data.photo_url);
      });
  }, []);

  let superHostDesc =
    "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.";

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.userContainer}>
          <div className={styles.userHeader}>
            <img className={styles.userPicture} src={hostPhoto} alt="Logo" />
            <div>
              <h2>Hosted By {name}</h2>
              <p>Joined in March 2021</p>
            </div>
          </div>
          <div className={styles.numbReviews}>
            <h3>
              <span className={styles.starIcon}>&#9733;</span>
              {numOfReviews} Reviews
            </h3>
            <h3>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={styles.checkIcon}
              />
              <span className={styles.checkIconText}>Identity Verified</span>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faMedal} className={styles.medalIcon} />
              Super Host
            </h3>
          </div>
          <div className={styles.aboutHost}>{aboutHost}</div>
          <div className={styles.superHost}>
            <h3>
              <strong>{name} is a Superhost</strong>
            </h3>
            <p className={styles.superHostDesc}>{superHostDesc}</p>
          </div>
        </div>
        <div className={styles.contactSection}>
          <p>
            Response rate:{" "}
            {props.listingId % 2 !== 0
              ? "100%"
              : `${Math.floor(Math.random() * 51) + 50}%`}
          </p>

          <p>
            Response time:{" "}
            {props.listingId % 2 !== 0 ? "within an hour" : "within 2 hours"}
          </p>

          <button className={styles.contactButton}>Contact Host</button>
          <span>
            To protect your payment, never transfer money or communicate outside
            of the Airbnb website or app.
          </span>
        </div>
      </div>
    </>
  );
}

export default HostInfo;
