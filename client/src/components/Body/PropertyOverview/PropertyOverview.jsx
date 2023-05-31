import styles from "./PropertyOverview.module.css";
import axios from "axios";
import { useQuery } from "react-query";

function PropertyOverview(props) {
  const { isLoading, isError, data, error, refetch } = useQuery(
    [`property${props.listingId}`],
    () =>
      axios
        .get(`http://localhost:4001/api/users/${props.listingId}`)
        .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.propertyOverview}>
      <div>
        <span className={styles.hostedBy}>
          Room in a townhouse hosted by {data.fname} {data.lname}
          {/* <img src={hostPhoto} className={styles.userPicture} /> */}
        </span>
        <div className={styles.infoContainer}>
          <span className={`${styles.chairInfo} ${styles.bedimg}`}>
            double bed
          </span>
          <span className={`${styles.chairInfo} ${styles.showerimg}`}>
            full bathroom
          </span>
          <span className={`${styles.chairInfo} ${styles.inhouse}`}>
            host lives here
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default PropertyOverview;
