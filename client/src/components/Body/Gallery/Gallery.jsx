import styles from "./Gallery.module.css";
import axios from "axios";
import { useQuery } from "react-query";

function Gallery(props) {
  const { isLoading, isError, data, error } = useQuery(
    ["gallery"],
    () =>
      axios
        .get(`http://localhost:3010/api/gallery/photo_url/${props.listingId}`)
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles["img-container"]}>
      <div className={styles.item1}>
        <img src={data[0]} alt="image 1" />
      </div>
      <div className={styles.gallery}>
        <div className={styles["gallery-item"]}>
          <img src={data[1]} alt="image 2" />
        </div>
        <div className={styles["gallery-item"]}>
          <img src={data[2]} alt="image 3" className={styles.img3} />
        </div>
        <div className={styles["gallery-item"]}>
          <img src={data[3]} alt="image 4" />
        </div>
        <div className={styles["gallery-item"]}>
          <img src={data[4]} alt="image 5" className={styles.img5} />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
