import styles from "./TaskList.module.css";
import type { Task } from "../../types/types";
import { TaskItem } from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
};
