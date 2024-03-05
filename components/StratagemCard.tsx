"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { StratagemType } from "@/lib/stratagemsData";
import { useInputContext } from "@/context/input-context";
import Arrow from "@/components/Arrow";
import styles from "./StratagemCard.module.css";
import { useBatchContext } from "@/context/batch-context";

interface Props {
  stratagem: StratagemType;
}

export default function StratagemCard({ stratagem }: Props) {
  const { disabledNames, solvedNames } = useBatchContext();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const { input } = useInputContext();

  const { name, code } = stratagem;

  useEffect(() => {
    disabledNames.includes(name) ? setDisabled(true) : setDisabled(false);
    solvedNames.includes(name) ? setSolved(true) : setSolved(false);
  }, [disabledNames, solvedNames]);

  return (
    <div
      className={`${styles.Card} ${disabled && styles.disabled} ${
        solved && styles.solved
      }`}
    >
      <Image
        src={`/icons/${name.replace(/\s/g, "")}.png`}
        alt={name}
        width={48}
        height={48}
      />
      <div className={styles.stratagemInfo}>
        <p>{solved ? "Stratagem Deployed" : name.toUpperCase()}</p>
        <div className={styles.stratagemCode}>
          {solved
            ? null
            : code.map((dir, i) => {
                const hl = i === input.length && i > 0 && !disabled;
                return <Arrow key={name + i} dir={dir} hl={hl} />;
              })}
        </div>
      </div>
    </div>
  );
}
