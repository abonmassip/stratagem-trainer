/**
 * Custom hook that starts counting and keeps track of the elapsed time.
 */

"use client";

import React, { createContext, useContext, useRef, useState } from "react";

type StopwatchContextProviderProps = {
  children: React.ReactNode;
};

type StopwatchContext = {
  elapsedTime: number;
  isRunning: boolean;
  isFinished: boolean;
  startTime: () => void;
  stopTime: () => void;
};

export const StopwatchContext = createContext<StopwatchContext | null>(null);

export default function StopwatchContextProvider({
  children,
}: StopwatchContextProviderProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  const startTime = () => {
    const startTime = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
    setIsRunning(true);
  };

  const stopTime = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(true);
  };

  return (
    <StopwatchContext.Provider
      value={{ elapsedTime, isRunning, startTime, stopTime, isFinished }}
    >
      {children}
    </StopwatchContext.Provider>
  );
}

export function useStopwatchContext() {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error(
      "StopwatchContext should be used within StopwatchContextProvider"
    );
  }
  return context;
}
