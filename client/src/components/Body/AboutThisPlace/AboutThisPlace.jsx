import axios from "axios";
import { useQuery } from "react-query";
import styles from "./AboutThisPlace.module.css";

function AboutThisPlace() {
  const { isLoading, isError, data, error } = useQuery(
    ["about"],
    () =>
      axios.get("http://localhost:3003/api/about/2").then((res) => res.data),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles["about"]}>
      <h2 className={styles["aboutTitle"]}>About This Place</h2>
      <div>{data[0].description}</div>
      <a className={styles["aboutShowMore"]}>Show more &gt;</a>
    </div>
  );
}

export default AboutThisPlace;
