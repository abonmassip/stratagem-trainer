/**
 * Component that displays end mission stats. It uses the
 * useStopwatchContext to get the elapsed time to calculate
 * the score. Star ratings based on predefined time thresholds.
 */

"use client";

import { useEffect, useState } from "react";

import { useStopwatchContext } from "@/context/stopwatch-context";

import { formatTime } from "@/lib/utils";
import Star from "@/components/Star";

import styles from "./EndStats.module.css";

export default function EndStats() {
  const { elapsedTime } = useStopwatchContext();

  const [stars, setStars] = useState<number>(5);
  const [starMessage, setStarMessage] = useState<string>("");
  const [nextStarMessage, setNextStarMessage] = useState<string>("");

  // Set background image and calculate stats on component mount
  useEffect(() => {
    document.body.style.backgroundImage = `url("/bg/8.webp")`;
    getStats();
  }, []);

  // Function to calculate star ratings and messages based on elapsed time
  function getStats() {
    const starRatings: {
      [key: number]: { thresholdInMilliseconds: number; message: string };
    } = {
      0: { thresholdInMilliseconds: 125000, message: "Pointless Sacrifice" },
      1: { thresholdInMilliseconds: 115000, message: "Costly Failure" },
      2: { thresholdInMilliseconds: 105000, message: "Shameful Return" },
      3: { thresholdInMilliseconds: 90000, message: "Worthwhile Sacrifice" },
      4: { thresholdInMilliseconds: 80000, message: "Victory" },
      5: { thresholdInMilliseconds: 0, message: "Glorious Victory" },
    };

    let starPoints: number;
    switch (true) {
      case elapsedTime >= starRatings["0"].thresholdInMilliseconds:
        starPoints = 0;
        break;
      case elapsedTime >= starRatings["1"].thresholdInMilliseconds:
        starPoints = 1;
        break;
      case elapsedTime >= starRatings["2"].thresholdInMilliseconds:
        starPoints = 2;
        break;
      case elapsedTime >= starRatings["3"].thresholdInMilliseconds:
        starPoints = 3;
        break;
      case elapsedTime >= starRatings["4"].thresholdInMilliseconds:
        starPoints = 4;
        break;
      default:
        starPoints = 5;
        break;
    }

    const improveMessage =
      starPoints < 5
        ? `Try to beat ${formatTime(
            starRatings[starPoints + 1].thresholdInMilliseconds
          )}`
        : "Thank you for spreading Managed Democracy!";

    setStars(starPoints);
    setStarMessage(starRatings[starPoints].message);
    setNextStarMessage(improveMessage);
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <span className={styles.big}>« </span>
        MISSION COMPLETED
        <span className={styles.big}> »</span>
      </div>

      <div className={styles.mission_time}>
        <div className={styles.mission_time_title}>MISSION TIME</div>
        <div>{formatTime(elapsedTime)}</div>
      </div>

      <div className={styles.stars}>
        {Array(5)
          .fill("")
          .map((el, i) => (
            <Star key={`star${i}`} won={i < stars ? true : false} />
          ))}
      </div>

      <div className={styles.message_border}>
        <div className={styles.message}>{starMessage}</div>
      </div>

      <div className={styles.hint}>{nextStarMessage}</div>

      <button
        onClick={() => window.location.reload()}
        className={styles.try_again}
      >
        TRY AGAIN
      </button>
    </div>
  );
}
