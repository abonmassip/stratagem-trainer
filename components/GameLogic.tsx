"use-client";

import { useBatchContext } from "@/context/batch-context";
import { useInputContext } from "@/context/input-context";
import { StratagemType } from "@/lib/stratagemsData";
import { useEffect, useState } from "react";
import { useSoundContext } from "@/context/sound-context";
import { useStopwatchContext } from "@/context/stopwatch-context";

export default function GameLogic() {
  const { input, setInput } = useInputContext();
  const { remaining, batch, batchCount, getBatch, off, setOff, done, setDone } =
    useBatchContext();
  const { playSound } = useSoundContext();
  const { stopTime } = useStopwatchContext();

  const [left, setLeft] = useState<StratagemType[]>([]);
  const [disabled, setDisabled] = useState<StratagemType[]>([]);
  const [solved, setSolved] = useState<StratagemType[]>([]);

  useEffect(() => {
    setLeft([...batch]);
  }, [batch]);

  useEffect(() => {
    if (input.length === 0) return;

    const step = input.length - 1;

    const newLeft: StratagemType[] = [];
    const newDisabled: StratagemType[] = [...disabled];
    const newSolved: StratagemType[] = [...solved];

    left.forEach((stratagem: StratagemType, i) => {
      // if input matches sequence and sequence is complete move to solved
      if (stratagem.code[step] === input[step]) {
        if (stratagem.code.length === input.length) {
          newSolved.push(stratagem);
          setDone((prev) => [...prev, stratagem.name]);
          playSound("sequence");
        } else {
          // if sequence is not complete keep stratagem in left
          newLeft.push(stratagem);
        }
      } else if (stratagem.code[step] !== input[step]) {
        // if input doesn't match move to disabled
        newDisabled.push(stratagem);
        setOff((prev) => [...prev, stratagem.name]);
      }
    });

    if (newSolved.length === batch.length) {
      // all batch is solved, reset all and next batch
      setLeft([]);
      setDisabled([]);
      setOff([]);
      setSolved([]);
      setSolved([]);
      setInput([]);
      if (remaining.length > 0) {
        playSound("mission");
        getBatch();
      } else {
        playSound("extraction");
        stopTime();
      }
    } else if (
      newDisabled.length === batch.length ||
      newSolved.length + newDisabled.length === batch.length
    ) {
      // all remaining to be solved are disabled, reset input and disabled
      setInput([]);
      setLeft(newDisabled);
      setDisabled([]);
      setOff([]);
      setSolved(newSolved);
      if (newSolved.length === solved.length) playSound("wrong");
    } else {
      // still remaining stratagems
      setLeft(newLeft);
      setDisabled(newDisabled);
      setSolved(newSolved);
      playSound("right");
    }
  }, [input]);

  function DebugInfo() {
    return (
      <div className="debug">
        <p>--input--: {input.join(",").toUpperCase()}</p>
        <p>--left--: {left.map((el) => el.name).join(", ")}</p>
        <p>--disabled--: {disabled.map((el) => el.name).join(", ")}</p>
        <p>--solved--: {solved.map((el) => el.name).join(", ")}</p>
        <p>--batch--: {batch.map((el) => el.name).join(",")}</p>
        <p>--off--: {off.join(",")}</p>
        <p>--done--: {done.join(",")}</p>
      </div>
    );
  }

  // return <DebugInfo />;
  return null;
}
