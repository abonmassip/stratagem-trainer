import StratagemGame from "@/components/StratagemGame";
import InputContextProvider from "@/context/input-context";
import BatchContextProvider from "@/context/batch-context";
import SoundContextProvider from "@/context/sound-context";
import { StratagemType } from "@/lib/stratagemsData";
import StopwatchContextProvider from "@/context/stopwatch-context";

export default async function Home() {
  const stratagemsData: StratagemType[] = await fetch(
    "http://localhost:3000/api/data",
    { cache: "no-cache" }
  ).then((res) => res.json());

  return (
    <InputContextProvider>
      <StopwatchContextProvider>
        <SoundContextProvider>
          <BatchContextProvider stratagems={stratagemsData}>
            <StratagemGame />
          </BatchContextProvider>
        </SoundContextProvider>
      </StopwatchContextProvider>
    </InputContextProvider>
  );
}
