import { useInputContext } from "@/context/input-context";
import { useStopwatchContext } from "@/context/stopwatch-context";
import { useEffect } from "react";
import { formatTime } from "@/lib/utils";

export default function Timer() {
  const { input } = useInputContext();
  const { elapsedTime, isRunning, startTime } = useStopwatchContext();

  useEffect(() => {
    if (input.length > 0 && isRunning === false) {
      startTime();
    }
  }, [input]);

  return (
    <div>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
}
