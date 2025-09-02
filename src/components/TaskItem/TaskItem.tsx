import styles from "./TaskItem.module.css";
import type { Task } from "../../types/types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <li
      className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={styles.checkbox}
      />
      <span
        className={`${styles.text} ${task.completed ? styles.textCompleted : ""}`}
      >
        {task.text}
      </span>
    </li>
  );
};
