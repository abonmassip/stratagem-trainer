import { NextResponse } from "next/server";
import { stratagemsData } from "@/lib/stratagemsData";
import { shuffleStratagems } from "@/lib/utils";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  await sleep(2000);

  return NextResponse.json(shuffleStratagems(stratagemsData));
}
