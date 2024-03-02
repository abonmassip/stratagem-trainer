"use client";

import React, { createContext, useContext, useState } from "react";
import { useInputContext } from "@/context/input-context";
import { Howl, Howler } from "howler";
Howler.volume(0.7);

type SoundContextProviderProps = {
  children: React.ReactNode;
};

type SoundContext = {
  sound: boolean;
  toggleSound: () => void;
  playSound: (track: string) => void;
};

export const SoundContext = createContext<SoundContext | null>(null);

export default function SoundContextProvider({
  children,
}: SoundContextProviderProps) {
  const [sound, setSound] = useState<boolean>(false);
  const { input } = useInputContext();

  function toggleSound() {
    Howler.mute(sound);
    setSound(!sound);
  }

  let SoundRight: Howl;
  let SoundWrong: Howl;
  let SoundSequence: Howl;
  let SoundMission: Howl;
  let SoundExtraction: Howl;

  const playRight = (rate: number) => {
    if (SoundRight === undefined) {
      SoundRight = new Howl({
        src: ["/sounds/input_right.mp3"],
        rate: rate,
      });
    }
    SoundRight.play();
  };
  const playWrong = () => {
    if (SoundWrong === undefined) {
      SoundWrong = new Howl({
        src: ["/sounds/input_wrong.mp3"],
      });
    }
    SoundWrong.play();
  };
  const playSequence = () => {
    if (SoundSequence === undefined) {
      SoundSequence = new Howl({
        src: ["/sounds/code_finished.mp3"],
      });
    }
    SoundSequence.play();
  };
  const playMission = () => {
    if (SoundMission === undefined) {
      SoundMission = new Howl({
        src: ["/sounds/objective_completed.mp3"],
      });
    }
    SoundMission.play();
  };
  const playExtraction = () => {
    if (SoundExtraction === undefined) {
      SoundExtraction = new Howl({
        src: ["/sounds/extraction.mp3"],
      });
    }
    SoundExtraction.play();
  };

  function playSound(track: string) {
    if (!sound) return;
    switch (track) {
      case "right":
        playRight(1 + input.length * 0.1);
        break;
      case "wrong":
        playWrong();
        break;
      case "sequence":
        playSequence();
        break;
      case "mission":
        playMission();
        break;
      case "extraction":
        playExtraction();
        break;
      default:
        break;
    }
  }

  return (
    <SoundContext.Provider value={{ sound, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("SoundContext should be used within SoundContextProvider");
  }
  return context;
}
