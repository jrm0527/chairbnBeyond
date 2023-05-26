import { useEffect, useState } from "react";
import styles from "./TitleBar.module.css";

function TitleBar(props) {
  const [titleData, setTitleData] = useState([]);

  const fetchTitleData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/title/${props.listingId}`
      );
      const data = await response.json();
      console.log(data);
      setTitleData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTitleData();
  }, []);

  return (
    <>
      {titleData.length > 0 ? (
        <div className={styles["titlebar"]}>
          <div className={styles["titleContainer"]}>
            <img src="../../../../src/assets/accessibility.png" alt="" />
            <div className={styles["actualTitle"]}>{titleData[0].title}</div>
          </div>
          <div className={styles["extraInfo"]}>
            <div className={styles["extraInfoLeft"]}>
              <span className={styles["starIcon"]}>&#9733;</span>
              <div className={styles["infoElement"]}>
                {titleData[0].average_rating}
              </div>
              <div className={styles["infoElement"]}> &#x2022; </div>
              <div className={styles["infoElement"]}>
                <a
                //   href="nothingyet"
                >
                  {titleData[0].review_count} Reviews
                </a>
              </div>
              <div className={styles["infoElement"]}> &#x2022; </div>
              <div className={styles["infoElement"]}>
                <a
                //   href="nothingyet"
                >
                  {titleData[0].city}
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default TitleBar;
