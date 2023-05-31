import { useState } from "react";
import styles from "./Amenities.module.css";
import Modal from "./Modal/Modal.jsx";
import axios from "axios";
import { useQuery } from "react-query";

function Amenities(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    isLoading: isLoadingAmenities,
    isError: isErrorAmenities,
    data: amenities,
    error: errorAmenities,
  } = useQuery(["amenities"], () =>
    axios
      .get(`http://localhost:3002/api/amenities/${props.listingId}`)
      .then((res) => res.data)
  );

  const {
    isLoading: isLoadingTenAmenities,
    isError: isErrorTenAmenities,
    data: tenAmenities,
    error: errorTenAmenities,
  } = useQuery(["tenAmenities"], () =>
    axios
      .get(`http://localhost:3002/api/amenities/ten/${props.listingId}`)
      .then((res) => res.data)
  );

  if (isLoadingAmenities || isLoadingTenAmenities) return "Loading...";

  if (isErrorAmenities)
    return "An error has occurred: " + errorAmenities.message;

  if (isErrorTenAmenities)
    return "An error has occurred: " + errorTenAmenities.message;

  return (
    <div className={styles["master_container"]}>
      <div className={styles["amenities-div"]}>
        <div className={styles["title_div"]}>
          <div className={styles["title_header"]}>
            <h2 className={styles["title"]}>What this place offers</h2>
          </div>
        </div>

        <div className={styles["amenity-table"]}>
          {tenAmenities.map((amenity) => (
            <div key={amenity.id} className={styles["amenities_div"]}>
              <div className={styles["amenity_svg"]}></div>
              <div className={styles["amenity"]}>{amenity.amenity}</div>
            </div>
          ))}
        </div>
        <div className={styles["amenities-button-div"]}>
          <button
            type="button"
            className={styles["show-amenities-button"]}
            onClick={openModal}
          >
            Show all {amenities.length} amenities
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default Amenities;
