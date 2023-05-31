import axios from "axios";
import { useQuery } from "react-query";
import styles from "./Reviews.module.css";

export default function Reviews(props) {
  const { isLoading, isError, data, error } = useQuery(["reviews"], () =>
    axios
      .get(`http://localhost:3005/api/reviews/${props.listingId}`)
      .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const reviews = data;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className={styles["reviews-component"]}>
      <div className={styles["group-section"]}>
        <div className={styles["component-container"]}>
          <div className={styles["component-subcontainer-1"]}>
            <div className={styles["top-border"]}></div>
            <div className={styles["component-subcontainer-2"]}>
              <section className={styles["lean-section"]}>
                <div className={styles["title-container"]}>
                  <span className={styles["star-container"]}>★</span>
                  <span className={styles["rating-reviews"]}>
                    <h2 className={styles["section-header"]}>
                      <span className={styles["rating-reviews-text"]}>
                        {averageRating.toFixed(2)} · {reviews.length} reviews
                      </span>
                    </h2>
                  </span>
                </div>
                <div className={styles["attributes-section"]}>
                  <div className={styles["attributes-container"]}>
                    <div className={styles["attributes-lean-container"]}>
                      <div className={styles["attribute-container-1"]}>
                        <div className={styles["attribute-container-2"]}>
                          <div className={styles["attribute-rating-container"]}>
                            <div className={styles.attribute}>Cleanliness</div>
                            <div className={styles["rating-container"]}>
                              <div
                                className={styles["rating-slider-container"]}
                              >
                                <span
                                  className={styles["rating-slider"]}
                                ></span>
                              </div>
                              <span className={styles["attribute-rating"]}>
                                5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles["attribute-container-1"]}>
                        <div className={styles["attribute-container-2"]}>
                          <div className={styles["attribute-rating-container"]}>
                            <div className={styles.attribute}>Accuracy</div>
                            <div className={styles["rating-container"]}>
                              <div
                                className={styles["rating-slider-container"]}
                              >
                                <span
                                  className={styles["rating-slider"]}
                                ></span>
                              </div>
                              <span className={styles["attribute-rating"]}>
                                5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles["attribute-container-1"]}>
                        <div className={styles["attribute-container-2"]}>
                          <div className={styles["attribute-rating-container"]}>
                            <div className={styles.attribute}>
                              Communication
                            </div>
                            <div className={styles["rating-container"]}>
                              <div
                                className={styles["rating-slider-container"]}
                              >
                                <span
                                  className={styles["rating-slider"]}
                                ></span>
                              </div>
                              <span className={styles["attribute-rating"]}>
                                5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles["attribute-container-1"]}>
                        <div className={styles["attribute-container-2"]}>
                          <div className={styles["attribute-rating-container"]}>
                            <div className={styles.attribute}>Location</div>
                            <div className={styles["rating-container"]}>
                              <div
                                className={styles["rating-slider-container"]}
                              >
                                <span
                                  className={styles["rating-slider"]}
                                ></span>
                              </div>
                              <span className={styles["attribute-rating"]}>
                                5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles["attribute-container-1"]}>
                        <div className={styles["attribute-container-2"]}>
                          <div className={styles["attribute-rating-container"]}>
                            <div className={styles.attribute}>Check-in</div>
                            <div className={styles["rating-container"]}>
                              <div
                                className={styles["rating-slider-container"]}
                              >
                                <span
                                  className={styles["rating-slider"]}
                                ></span>
                              </div>
                              <span className={styles["attribute-rating"]}>
                                5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles["attribute-container-1"]}>
                        <div className={styles["attribute-container-2"]}>
                          <div className={styles["attribute-rating-container"]}>
                            <div className={styles.attribute}>Value</div>
                            <div className={styles["rating-container"]}>
                              <div
                                className={styles["rating-slider-container"]}
                              >
                                <span
                                  className={styles["rating-slider"]}
                                ></span>
                              </div>
                              <span className={styles["attribute-rating"]}>
                                5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["reviews-section"]}>
                  <div className={styles["reviews-section-container"]}>
                    <div className={styles["reviews-section-spacing"]}>
                      {reviews.map((review, index) => (
                        <div
                          className={styles["individual-review-container-1"]}
                          key={index}
                        >
                          {/* Individual review JSX */}
                          <div className={styles["user-date-section"]}>
                            <div className={styles["user-date-container"]}>
                              <div className={styles["name-date-container"]}>
                                <h3 className={styles["user-name"]}>
                                  {review.fname}
                                </h3>
                                <div
                                  className={styles["review-date-container"]}
                                >
                                  <div className={styles["review-date"]}>
                                    <ol className={styles["date-list"]}>
                                      {/* <li className={styles.date}>
                                        {review.date}
                                      </li> */}
                                      <li className={styles.date}>
                                        {new Date(
                                          review.enddate
                                        ).toLocaleString("en-US", {
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </div>
                              <div className={styles["user-photo-container"]}>
                                <div
                                  className={styles["user-photo-formatting-1"]}
                                >
                                  <div
                                    className={
                                      styles["user-photo-formatting-2"]
                                    }
                                  >
                                    <div
                                      className={
                                        styles["user-photo-formatting-3"]
                                      }
                                    >
                                      <img
                                        className={styles.picture}
                                        src={review.photo_url}
                                        alt={review.fname}
                                      />
                                      <div
                                        className={styles["user-unknown"]}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles["review-container-1"]}>
                            <div className={styles["review-container-2"]}>
                              <span className={styles["review-span-1"]}>
                                <span className={styles["review-span-2"]}>
                                  {review.review}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles["reviews-button-container"]}>
                  <button className={styles["reviews-button"]}>
                    Show all {reviews.length} reviews
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
