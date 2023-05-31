import axios from "axios";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMedal } from "@fortawesome/free-solid-svg-icons";
import styles from "./Host.module.css";

function HostInfo(props) {
  const {
    isLoading: isLoadingName,
    isError: isErrorName,
    data: name,
    error: errorName,
  } = useQuery(
    ["name"],
    () =>
      axios
        .get(`http://localhost:4001/api/users/${props.listingId}`)
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  // name = name[0].fname;

  const {
    isLoading: isLoadingAboutHost,
    isError: isErrorAboutHost,
    data: aboutHost,
    error: errorAboutHost,
  } = useQuery(
    ["aboutHost"],
    () =>
      axios
        .get(`http://localhost:4001/api/hosts/about/${props.listingId}`)
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  // aboutHost = aboutHost[0].about;

  const {
    isLoading: isLoadingNumOfReviews,
    isError: isErrorNumOfReviews,
    data: numOfReviews,
    error: errorNumOfReviews,
  } = useQuery(
    ["numOfReviews"],
    () =>
      axios.get(`http://localhost:4001/api/reviews`).then((res) => res.data),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  // numOfReviews = numOfReviews.length;

  const {
    isLoading: isLoadingHostPhoto,
    isError: isErrorHostPhoto,
    data: hostPhoto,
    error: errorHostPhoto,
  } = useQuery(
    ["hostPhoto"],
    () =>
      axios
        .get(`http://localhost:4001/api/hosts/photo/${props.listingId}`)
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  if (
    isLoadingName ||
    isLoadingAboutHost ||
    isLoadingNumOfReviews ||
    isLoadingHostPhoto
  )
    return "Loading...";

  if (isErrorName) return "An error has occurred: " + errorName.message;

  if (isErrorAboutHost)
    return "An error has occurred: " + errorAboutHost.message;

  if (isErrorNumOfReviews)
    return "An error has occurred: " + errorNumOfReviews.message;

  if (isErrorHostPhoto)
    return "An error has occurred: " + errorHostPhoto.message;

  let superHostDesc =
    "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.userContainer}>
        <div className={styles.userHeader}>
          <img
            className={styles.userPicture}
            src={hostPhoto.photo_url}
            alt="Logo"
          />
          <div>
            <h2>Hosted By {name.fname}</h2>
            <p>Joined in March 2021</p>
          </div>
        </div>
        <div className={styles.numbReviews}>
          <h3>
            <span className={styles.starIcon}>&#9733;</span>
            {numOfReviews.length} Reviews
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
        <div className={styles.aboutHost}>{aboutHost.about}</div>
        <div className={styles.superHost}>
          <h3>
            <strong>{name.fname} is a Superhost</strong>
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
  );
}

export default HostInfo;
