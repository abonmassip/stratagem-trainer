import styles from "./Arrow.module.css";

interface Props {
  dir: string;
  hl: boolean;
}

export default function Arrow({ dir, hl }: Props) {
  return (
    <div className={styles.arrow_container}>
      <svg
        viewBox="0 0 24 24"
        className={`${styles.arrow} ${styles[dir]} ${hl && styles.next}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 15H17V22H7V15Z" />
        <path d="M22 16L12 2L2 16H22Z" />
      </svg>
    </div>
  );
}
