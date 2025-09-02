import styles from "./Header.module.css";
import { useRef } from "react";

interface HeaderProps {
  onAddTask: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (value) {
      onAddTask(value);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.header} role="form">
      <span className={styles.arrow}>▼</span>
      <input
        ref={inputRef}
        type="text"
        className={styles.inputField}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};
