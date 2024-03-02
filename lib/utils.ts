export function shuffleStratagems(array: any[]): any[] {
  let curId = array.length;
  // There remain elements to shuffle
  while (curId !== 0) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId--;
    // Swap it with the current element.
    [array[curId], array[randId]] = [array[randId], array[curId]];
  }
  return array;
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const centiseconds = Math.floor((time % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}:${String(centiseconds).padStart(2, "0")}`;
}
