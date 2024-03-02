export const dynamic = "force-dynamic";

import StratagemGame from "@/components/StratagemGame";
import InputContextProvider from "@/context/input-context";
import BatchContextProvider from "@/context/batch-context";
import SoundContextProvider from "@/context/sound-context";
import { StratagemType } from "@/lib/stratagemsData";
import StopwatchContextProvider from "@/context/stopwatch-context";
import { shuffleStratagems, sleep } from "@/lib/utils";
import { stratagemsData } from "@/lib/stratagemsData";

export default async function Home() {
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
