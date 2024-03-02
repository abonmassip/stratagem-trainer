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
  remaining: StratagemType[];
  setRemaining: React.Dispatch<React.SetStateAction<StratagemType[]>>;
  getBatch: () => void;
  batchCount: { current: number; total: number };
  off: string[];
  setOff: React.Dispatch<React.SetStateAction<string[]>>;
  done: string[];
  setDone: React.Dispatch<React.SetStateAction<string[]>>;
};

const BatchContext = createContext<BatchContext | null>(null);

export default function BatchContextProvider({
  children,
  stratagems,
}: BatchContextProviderProps) {
  const [batch, setBatch] = useState<StratagemType[]>([]);
  const [remaining, setRemaining] = useState<StratagemType[]>(stratagems);
  const [batchCount, setBatchCount] = useState({
    current: 0,
    total: Math.ceil(remaining.length / 8),
  });
  const [off, setOff] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);

  function getBatch() {
    const left = [...remaining];
    const batch = left.splice(0, 8);

    setBatch(batch);
    setRemaining(left);

    const newCount = { ...batchCount, current: batchCount.current + 1 };
    setBatchCount(newCount);
    document.body.style.backgroundImage = `url("/bg/${newCount.current}.webp")`;
  }

  return (
    <BatchContext.Provider
      value={{
        batch,
        setBatch,
        remaining,
        setRemaining,
        getBatch,
        batchCount,
        off,
        setOff,
        done,
        setDone,
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
