import styles from "./PropertyOverview.module.css";
import React, { useEffect, useState } from "react";

function PropertyOverview(props) {
  const [name, setName] = useState([]);
  console.log(props.listingId)
  // const [hostPhoto, setHostPhoto] = useState([]);
  // useEffect(() => {
  //   fetch(`http://localhost:4001/api/hosts/photo/${props.listingId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHostPhoto(data.photo_url);
  //     });
  // }, []);
  useEffect(() => {
    fetch(`http://localhost:3005/api/users/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setName(data.fname);
      });
  }, []);

  return (
    <>
      <div className={styles.propertyOverview}>
        <div>
          <span className={styles.hostedBy}>
            Room in a townhouse hosted by {name}
          {/* <img src={hostPhoto} className={styles.userPicture} /> */}
          </span>
          <div className={styles.infoContainer}>
            <span className={`${styles.chairInfo} ${styles.bedimg}`}>double bed</span>
            <span className={`${styles.chairInfo} ${styles.showerimg}`}>full bathroom</span>
            <span className={`${styles.chairInfo} ${styles.inhouse}`}>host lives here</span>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyOverview;
