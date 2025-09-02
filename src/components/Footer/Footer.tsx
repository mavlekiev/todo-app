import styles from "./Footer.module.css";

interface FooterProps {
  count: number;
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  count,
  filter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}) => {
  return (
    <div className={styles.footer}>
      <span className={styles.count}>{count} items left</span>

      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${filter === "all" ? styles.filterButtonActive : ""}`}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${filter === "active" ? styles.filterButtonActive : ""}`}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>
        <button
          className={`${styles.filterButton} ${filter === "completed" ? styles.filterButtonActive : ""}`}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>

      {hasCompleted && (
        <button className={styles.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
};
