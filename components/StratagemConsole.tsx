"use client";

import StratagemCard from "@/components/StratagemCard";
import styles from "./StratagemConsole.module.css";
import Image from "next/image";
import { useBatchContext } from "@/context/batch-context";
import MuteButton from "./MuteButton";
import Timer from "./Timer";

export default function StratagemConsole() {
  const { batch, batchCount } = useBatchContext();

  return (
    <div className={styles.console_container}>
      <div className={`${styles.timer} ${styles.console_background}`}>
        <Timer />
      </div>
      <div className={`${styles.console_title} ${styles.console_background}`}>
        <Image
          className={styles.logo_shadow}
          src={`/stratagems.png`}
          alt="stratagems"
          width={20}
          height={20}
        />
        <div>STRATAGEMS</div>
        <div className={styles.console_pages}>
          <div>{batchCount.current}</div>/<div>{batchCount.total}</div>
        </div>
        <div className={styles.console_mute}>
          <MuteButton />
        </div>
      </div>
      <div className={`${styles.console} ${styles.console_background}`}>
        {batch.map((stratagem) => {
          return <StratagemCard key={stratagem.name} stratagem={stratagem} />;
        })}
      </div>
      <div className={styles.version}>
        <p>STRATAGEM TRAINER 1.000.004</p>
        <p>
          &copy; 2024 ABONMASSIP |{" "}
          <a href="https://github.com/abonmassip/stratagem-trainer">GITHUB</a>
        </p>
      </div>
    </div>
  );
}
