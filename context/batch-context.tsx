/**
 * Context that manages state related to the stratagems.
 * The batch is the current loaded stratagems in the game.
 * The remaining stratagems are stored too to be loaded later with
 * the function getBatch.
 * The batch count is used to paginate the stratagems.
 * The disabled and solved names lists are used to properly style
 * the stratagem cards.
 */

"use client";

import React, { createContext, useContext, useState } from "react";
import { StratagemType } from "@/lib/stratagemsData";

type BatchContextProviderProps = {
  children: React.ReactNode;
  stratagems: StratagemType[];
};

type BatchContext = {
  batch: StratagemType[];
  setBatch: React.Dispatch<React.SetStateAction<StratagemType[]>>;
  remainingStratagems: StratagemType[];
  setRemainingStratagems: React.Dispatch<React.SetStateAction<StratagemType[]>>;
  getBatch: () => void;
  batchCount: { current: number; total: number };
  disabledNames: string[];
  setDisabledNames: React.Dispatch<React.SetStateAction<string[]>>;
  solvedNames: string[];
  setSolvedNames: React.Dispatch<React.SetStateAction<string[]>>;
};

const BatchContext = createContext<BatchContext | null>(null);

export default function BatchContextProvider({
  children,
  stratagems,
}: BatchContextProviderProps) {
  const [batch, setBatch] = useState<StratagemType[]>([]);
  const [remainingStratagems, setRemainingStratagems] =
    useState<StratagemType[]>(stratagems);
  const [batchCount, setBatchCount] = useState({
    current: 0,
    total: Math.ceil(remainingStratagems.length / 8),
  });
  const [disabledNames, setDisabledNames] = useState<string[]>([]);
  const [solvedNames, setSolvedNames] = useState<string[]>([]);

  // Get new batch of stratagems to solve, keep the rest for later
  function getBatch() {
    const BatchAmount = 8;
    const left = [...remainingStratagems];
    const batch = left.splice(0, BatchAmount);

    setBatch(batch);
    setRemainingStratagems(left);

    const newCount = { ...batchCount, current: batchCount.current + 1 };
    setBatchCount(newCount);
    document.body.style.backgroundImage = `url("/bg/${newCount.current}.webp")`;
  }

  return (
    <BatchContext.Provider
      value={{
        batch,
        setBatch,
        remainingStratagems,
        setRemainingStratagems,
        getBatch,
        batchCount,
        disabledNames,
        setDisabledNames,
        solvedNames,
        setSolvedNames,
      }}
    >
      {children}
    </BatchContext.Provider>
  );
}

export function useBatchContext() {
  const context = useContext(BatchContext);
  if (!context) {
    throw new Error("BatchContext should be used within BatchContextProvider");
  }
  return context;
}
