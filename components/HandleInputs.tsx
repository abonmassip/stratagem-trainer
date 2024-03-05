/**
 * Component that adds event listeners for the keyboard keydown
 * and touch events, and stores the direction entered by the user
 * to the input state. It doesn't display anything
 */

"use client";

import { useInputContext } from "@/context/input-context";
import { useEffect } from "react";

export default function HandleInputs() {
  const { setInput } = useInputContext();

  // Make WASD work as arrow keys
  function getDirectionFromKeyEvent(key: string) {
    switch (key) {
      case "ArrowUp":
      case "KeyW":
        return "u";
      case "ArrowRight":
      case "KeyD":
        return "r";
      case "ArrowDown":
      case "KeyS":
        return "d";
      case "ArrowLeft":
      case "KeyA":
        return "l";
      default:
        return "";
    }
  }

  useEffect(() => {
    // KEYBOARD INPUTS: only use arrow keys and WASD

    const handleKeyDown = (event: any) => {
      const keyCode = getDirectionFromKeyEvent(event.code);
      if (!keyCode) return;

      setInput((prev) => [...prev, keyCode]);
    };

    // TOUCH INPUTS: register as "ArrowUp", "ArrowRight", ...

    let firstX: number;
    let firstY: number;

    const handleTouchStart = (e: any) => {
      firstX = e.touches[0].clientX;
      firstY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: any) => {
      if (firstX === null || firstY === null) return;

      const lastTouch = e.changedTouches[e.changedTouches.length - 1];
      const lastX = lastTouch.clientX;
      const lastY = lastTouch.clientY;
      const diffX = firstX - lastX;
      const diffY = firstY - lastY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 5) setInput((prev) => [...prev, "l"]);
        if (diffX < -5) setInput((prev) => [...prev, "r"]);
      } else {
        if (diffY > 5) setInput((prev) => [...prev, "u"]);
        if (diffY < -5) setInput((prev) => [...prev, "d"]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return null;
}
