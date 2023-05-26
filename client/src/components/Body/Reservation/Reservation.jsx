import { useEffect, useState } from "react";
import styles from "./Reservation.module.css";
import Guests from "./Guests/Guests";

function Reservation(props) {
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
      <div className={styles["reservation"]}>
        <div className={styles["reservationTitle"]}>
          <div>
            <span className={styles["price"]}>
              {titleData.length > 0 ? <>${titleData[0].price} </> : "Rate"}
            </span>
            <span>night</span>
          </div>
          <div className={styles["reviews"]}>
            {titleData.length > 0 ? (
              <div className={styles["extraInfo"]}>
                <span className={styles["starIcon"]}>&#9733;</span>
                <div className={styles["infoElement"]}>
                  {titleData[0].average_rating}
                </div>
                <div className={styles["infoElement"]}> &#x2022; </div>
                <div className={styles["infoElement"]}>
                  <a
                  //   href="nothingyet"
                  >
                    {titleData[0].review_count} reviews
                  </a>
                </div>
              </div>
            ) : (
              "stars/reviews"
            )}
          </div>
        </div>
        <div className={styles["reservationDetails"]}>
          <div className={styles["checkInOut"]}>
            <button className={styles["checkIn"]}>CHECK-IN</button>
            <button className={styles["checkOut"]}>CHECK-OUT</button>
          </div>
          <Guests />
        </div>
        <div className={styles["reserveButton"]}>
          <button className={styles["reserve"]}>Reserve</button>
        </div>
        <div>
          <p>You won't be charged yet</p>
        </div>
        <div className={styles["costBreakdown"]}>
          <div className={styles["roomFee"]}>
            <u>${titleData.length > 0 ? (<span>{titleData[0].price}</span>) : (<span>Loading...</span>)} x 5 nights</u>
            <div>${titleData.length > 0 ? (<span>{(titleData[0].price)*5}</span>) : (<span>Loading...</span>)}</div>
          </div>
          <div className={styles["cleaningFee"]}>
            <u>Cleaning fee</u>
            <div>$14</div>
          </div>
          <div className={styles["serviceFee"]}>
            <u>Chairbnb service fee</u>
            <div>$41</div>
          </div>
        </div>
        <div className={styles["totalFee"]}>
          <div>Total before taxes</div>
          <div>${titleData.length > 0 ? (<span>{((titleData[0].price)*5)+55}</span>) : (<span>Loading...</span>)}</div>
        </div>
      </div>
    </>
  );
}

export default Reservation;
