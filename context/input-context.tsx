"use client";

import React, { createContext, useContext, useState } from "react";

type InputContextProviderProps = {
  children: React.ReactNode;
};

type InputContext = {
  input: string[];
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
};

export const InputContext = createContext<InputContext | null>(null);

export default function InputContextProvider({
  children,
}: InputContextProviderProps) {
  const [input, setInput] = useState<string[]>([]);

  return (
    <InputContext.Provider value={{ input, setInput }}>
      {children}
    </InputContext.Provider>
  );
}

export function useInputContext() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("InputContext should be used within InputContextProvider");
  }
  return context;
}
