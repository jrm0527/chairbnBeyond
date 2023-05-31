import axios from "axios";
import { useQuery } from "react-query";
import styles from "./TitleBar.module.css";

function TitleBar(props) {
  const { isLoading, isError, data, error } = useQuery(["title"], () =>
    axios
      .get(`http://localhost:3050/api/title/${props.listingId}`)
      .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles["titlebar"]}>
      <div className={styles["titleContainer"]}>
        <img src="../../../../src/assets/accessibility.png" alt="" />
        <div className={styles["actualTitle"]}>{data[0].title}</div>
      </div>
      <div className={styles["extraInfo"]}>
        <div className={styles["extraInfoLeft"]}>
          <span className={styles["starIcon"]}>&#9733;</span>
          <div className={styles["infoElement"]}>{data[0].average_rating}</div>
          <div className={styles["infoElement"]}> &#x2022; </div>
          <div className={styles["infoElement"]}>
            <a
            //   href="nothingyet"
            >
              {data[0].review_count} Reviews
            </a>
          </div>
          <div className={styles["infoElement"]}> &#x2022; </div>
          <div className={styles["infoElement"]}>
            <a
            //   href="nothingyet"
            >
              {data[0].city}
            </a>
          </div>
        </div>
        <div className={styles["extraInfoRight"]}>
          <div className={styles["infoElement"]}>
            <img
              className={styles["upload"]}
              src="../../../../src/assets/upload.png"
              alt=""
            />
          </div>
          <div className={styles["infoElement"]}>
            <a
            //   href="nothingyet"
            >
              Share
            </a>
          </div>
          <div className={styles["infoElement"]}>&#10084;</div>
          <div className={styles["infoElement"]}>
            <a
            //   href="nothingyet"
            >
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleBar;
