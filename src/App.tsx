import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { Header } from "./components/Header/Header";
import { TaskList } from "./components/TaskList/TaskList";
import { Footer } from "./components/Footer/Footer";
import styles from "./App.module.css";

function App() {
  const { tasks, remainingTasks, addTask, toggleTask, clearCompleted } =
    useTasks();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className={styles.app}>
      <h1 className={styles.h1}>todos</h1>

      <div className={styles.content}>
        <Header onAddTask={addTask} />
        <TaskList tasks={filteredTasks} onToggle={toggleTask} />
        <Footer
          count={remainingTasks}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={tasks.some((t) => t.completed)}
        />
      </div>
    </div>
  );
}

export default App;
