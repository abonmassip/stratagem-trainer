export const dynamic = "force-dynamic";

import { StratagemType } from "@/lib/stratagemsData";
import { stratagemsData } from "@/lib/stratagemsData";
import { shuffleStratagems, sleep } from "@/lib/utils";

import InputContextProvider from "@/context/input-context";
import StopwatchContextProvider from "@/context/stopwatch-context";
import SoundContextProvider from "@/context/sound-context";
import BatchContextProvider from "@/context/batch-context";

import StratagemGame from "@/components/StratagemGame";

export default async function Home() {
  // Add 2s extra loading to see the loading.tsx UI
  async function getData() {
    await sleep(2000);
    return shuffleStratagems(stratagemsData);
  }

  const data: StratagemType[] = await getData();

  return (
    <InputContextProvider>
      <StopwatchContextProvider>
        <SoundContextProvider>
          <BatchContextProvider stratagems={data}>
            <StratagemGame />
          </BatchContextProvider>
        </SoundContextProvider>
      </StopwatchContextProvider>
    </InputContextProvider>
  );
}
