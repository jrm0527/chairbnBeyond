import React, { useState } from "react";
import styles from "./Calendar.module.css";
import Cal from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["top-border"]}></div>
      <div className={styles["heading-container"]}>
        <div className={styles["nights-location-container"]}>
          <h2 className={styles["nights-location-heading"]}>
            5 nights in Minot
          </h2>
        </div>
        <div className={styles["date-range-container"]}>
          <div className={styles["date-range"]}>
            May 25, 2023 - May 30, 2023
          </div>
        </div>
      </div>
      <div className={styles["calendars-section"]}>
        <div className={styles["single-calendar-container"]}>
          <Cal onChange={setDate} value={date} />
        </div>
        <div className={styles["single-calendar-container"]}>
          <Cal value={new Date(date.getFullYear(), date.getMonth() + 1)} />
        </div>
      </div>
      {/* <div className={styles["calendars-section"]}>
        <div className={styles["single-calendar-container"]}>
          <div className={styles["single-calendar-header"]}>
            <div className={styles["header-month"]}>May 2023</div>
          </div>
          <div className={styles["days-container"]}>
            <div className={styles["days-list"]}>
              <div className={styles.day}>Su</div>
              <div className={styles.day}>Mo</div>
              <div className={styles.day}>Tu</div>
              <div className={styles.day}>We</div>
              <div className={styles.day}>Th</div>
              <div className={styles.day}>Fr</div>
              <div className={styles.day}>Sa</div>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <div className={styles["past-day"]}>1</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>2</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>3</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>4</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>5</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>6</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["past-day"]}>7</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>8</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>9</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>10</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>11</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>12</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>13</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["past-day"]}>14</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>15</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>16</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>17</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>18</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>19</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>20</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["past-day"]}>21</div>
                </td>
                <td>
                  <div className={styles["past-day"]}>22</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>23</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>24</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>25</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>26</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>27</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["present-future-day"]}>28</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>29</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>30</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>31</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles["single-calendar-container"]}>
          <div className={styles["single-calendar-header"]}>
            <div className={styles["header-month"]}>June 2023</div>
          </div>
          <div className={styles["days-container"]}>
            <div className={styles["days-list"]}>
              <div className={styles.day}>Su</div>
              <div className={styles.day}>Mo</div>
              <div className={styles.day}>Tu</div>
              <div className={styles.day}>We</div>
              <div className={styles.day}>Th</div>
              <div className={styles.day}>Fr</div>
              <div className={styles.day}>Sa</div>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className={styles["present-future-day"]}>1</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>2</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>3</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["present-future-day"]}>4</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>5</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>6</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>7</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>8</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>9</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>10</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["present-future-day"]}>11</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>12</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>13</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>14</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>15</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>16</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>17</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["present-future-day"]}>18</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>19</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>20</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>21</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>22</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>23</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>24</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles["present-future-day"]}>25</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>26</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>27</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>28</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>29</div>
                </td>
                <td>
                  <div className={styles["present-future-day"]}>30</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      <div className={styles["bottom-section"]}>
        <img
          className={styles["keyboard"]}
          src="../../../../src/assets/keyboard.png"
          alt="keyboard"
        />
        <div className={styles["clear-dates"]}>Clear dates</div>
      </div>
    </div>
  );
}
