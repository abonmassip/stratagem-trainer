"use client";

import { useStopwatchContext } from "@/context/stopwatch-context";
import styles from "./EndStats.module.css";
import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import Star from "@/components/Star";

export default function EndStats() {
  const { elapsedTime } = useStopwatchContext();
  const [stars, setStars] = useState<number>(5);
  const [starMessage, setStarMessage] = useState<string>("");
  const [nextStarMessage, setNextStarMessage] = useState<string>("");

  const thresholds = [110000, 100000, 80000, 75000, 70000];

  useEffect(() => {
    document.body.style.backgroundImage = `url("/bg/8.webp")`;
    giveStats();
  }, []);

  function giveStars(milliseconds: number): number {
    switch (true) {
      case milliseconds <= thresholds[4]:
        return 5;
      case milliseconds <= thresholds[3]:
        return 4;
      case milliseconds <= thresholds[2]:
        return 3;
      case milliseconds <= thresholds[1]:
        return 2;
      case milliseconds <= thresholds[0]:
        return 1;
      default:
        return 0;
    }
  }

  function giveStats() {
    const messages = [
      "Pointless Sacrifice",
      "Costly Failure",
      "Shameful Return",
      "Worthwhile Sacrifice",
      "Victory",
      "Glorious Victory",
    ];

    const starPoints = giveStars(elapsedTime);
    const improveMessage =
      starPoints < 5
        ? `Try to beat ${formatTime(thresholds[starPoints])}`
        : "Thank you for spreading Managed Democracy!";

    setStars(starPoints);
    setStarMessage(messages[starPoints]);
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
