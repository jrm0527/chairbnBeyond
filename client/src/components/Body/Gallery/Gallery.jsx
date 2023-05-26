import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";


function Gallery(props) {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3005/api/gallery/photo_url/${props.listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        console.log(gallery);
      })
      .catch((err) => {
        console.error("Error fetching gallery: ", err);
      });
  }, []);

  useEffect(() => {
    console.log(gallery);
  }, [gallery]);



  return (
    <div className={styles["img-container"]}>
      <div className={styles.item1}>
        <img
          src={gallery[0]}
          alt="image 1"
        />
      </div>
      <div className={styles.gallery}>
        <div className={styles["gallery-item"]}>
          <img
            src={gallery[1]}
            alt="image 2"
          />
        </div>
        <div className={styles["gallery-item"]}>
          <img
            src={gallery[2]}
            alt="image 3"
            className={styles.img3}
          />
        </div>
        <div className={styles["gallery-item"]}>
          <img
            src={gallery[3]}
            alt="image 4"
          />
        </div>
        <div className={styles["gallery-item"]}>
          <img
            src={gallery[4]}
            alt="image 5"
            className={styles.img5}
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
