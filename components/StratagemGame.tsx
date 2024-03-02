"use client";

import { useEffect } from "react";
import StratagemConsole from "@/components/StratagemConsole";
import styles from "./StratagemGame.module.css";
import HandleInputs from "./HandleInputs";
import GameLogic from "./GameLogic";
import { useBatchContext } from "@/context/batch-context";
import EndStats from "./EndStats";
import { useStopwatchContext } from "@/context/stopwatch-context";

export default function StratagemGame() {
  const { batch, getBatch } = useBatchContext();
  const { isFinished } = useStopwatchContext();

  useEffect(() => {
    getBatch();
  }, []);

  return (
    <>
      {batch.length > 0 ? (
        <main className={styles.main}>
          <HandleInputs />
          <GameLogic />
          {isFinished ? <EndStats /> : <StratagemConsole />}
        </main>
      ) : null}
    </>
  );
}
