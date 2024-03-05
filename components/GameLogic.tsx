/**
 * Component containing the game logic. It doesn't display
 * anything. It runs every time the user inputs a direction,
 * and decides what to do next.
 */

"use-client";

import { useEffect, useState } from "react";

import { useInputContext } from "@/context/input-context";
import { useStopwatchContext } from "@/context/stopwatch-context";
import { useSoundContext } from "@/context/sound-context";
import { useBatchContext } from "@/context/batch-context";

import { StratagemType } from "@/lib/stratagemsData";

export default function GameLogic() {
  const { input, setInput } = useInputContext();
  const { stopTime } = useStopwatchContext();
  const { playSound } = useSoundContext();

  // Keep track of disabled and solved stratagems in BatchContext
  const {
    remainingStratagems,
    batch,
    getBatch,
    setDisabledNames,
    setSolvedNames,
  } = useBatchContext();

  const [loadedStratagems, setLoadedStratagems] = useState<StratagemType[]>([]);
  const [disabledStratagems, setDisabledStratagems] = useState<StratagemType[]>(
    []
  );
  const [solvedStratagems, setSolvedStratagems] = useState<StratagemType[]>([]);

  useEffect(() => {
    setLoadedStratagems([...batch]);
  }, [batch]);

  useEffect(() => {
    if (input.length === 0) return;

    const lastInputIndex = input.length - 1;

    const newLoaded: StratagemType[] = [];
    const newDisabled: StratagemType[] = [...disabledStratagems];
    const newSolved: StratagemType[] = [...solvedStratagems];

    // Loop loaded stratagems on each input to check sequences
    loadedStratagems.forEach((stratagem: StratagemType, i) => {
      if (stratagem.code[lastInputIndex] === input[lastInputIndex]) {
        if (stratagem.code.length === input.length) {
          // If last input value matches sequence and sequence is complete move to solved
          newSolved.push(stratagem);
          setSolvedNames((prev) => [...prev, stratagem.name]);
          playSound("sequence");
        } else {
          // If sequence is not complete keep stratagem in loaded
          newLoaded.push(stratagem);
        }
      } else if (stratagem.code[lastInputIndex] !== input[lastInputIndex]) {
        // If last input value doesn't match the sequence move to disabled
        newDisabled.push(stratagem);
        setDisabledNames((prev) => [...prev, stratagem.name]);
      }
    });

    // After looping, check what to do next
    if (newSolved.length === batch.length) {
      // If all batch is solved, reset state and get next batch or finish game
      setLoadedStratagems([]);
      setDisabledStratagems([]);
      setDisabledNames([]);
      setSolvedStratagems([]);
      setSolvedStratagems([]);
      setInput([]);
      if (remainingStratagems.length > 0) {
        playSound("mission");
        getBatch();
      } else {
        playSound("extraction");
        stopTime();
      }
    } else if (newSolved.length + newDisabled.length === batch.length) {
      // If there are still stratagems to solve and none is active, reset input and reset disabled stratagems
      setInput([]);
      setLoadedStratagems(newDisabled);
      setDisabledStratagems([]);
      setDisabledNames([]);
      setSolvedStratagems(newSolved);
      if (newSolved.length === solvedStratagems.length) playSound("wrong");
    } else {
      // If there are still stratagems active don't reset
      setLoadedStratagems(newLoaded);
      setDisabledStratagems(newDisabled);
      setSolvedStratagems(newSolved);
      playSound("right");
    }
  }, [input]);

  return null;
}
