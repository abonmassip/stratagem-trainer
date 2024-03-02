import styles from "./Arrow.module.css";

interface Props {
  dir: string;
  hl: boolean;
}

export default function Arrow({ dir, hl }: Props) {
  return (
    <div className={styles.arrow_container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 16 16"
        className={`${styles.arrow} ${styles[dir]} ${hl && styles.next}`}
      >
        <path d="M4.5 8h7v6h-7z" />
        <path d="M14 9 8 1 2 9z" />
      </svg>
    </div>
  );
}
