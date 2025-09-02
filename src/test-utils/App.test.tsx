import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { expect, vi } from "vitest";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("App", () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.getItem.mockReturnValue("[]");
  });

  test("отображает заголовок todos", () => {
    render(<App />);
    expect(screen.getByText("todos")).toBeInTheDocument();
  });

  test("добавляет новую задачу при отправке формы", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = screen.getByRole("form");

    await fireEvent.change(input, { target: { value: "Новая задача" } });
    await fireEvent.submit(form);

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  test("переключает состояние задачи", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, text: "Test task", completed: false }]),
    );

    render(<App />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await fireEvent.click(checkbox);
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  test("отображает количество оставшихся задач", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([
        { id: 1, text: "Active task", completed: false },
        { id: 2, text: "Done task", completed: true },
      ]),
    );

    render(<App />);

    const remainingText = await screen.findByText("1 items left");
    expect(remainingText).toBeInTheDocument();
  });

  test("очищает выполненные задачи", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([
        { id: 1, text: "Task 1", completed: false },
        { id: 2, text: "Task 2", completed: true },
      ]),
    );

    render(<App />);

    const clearButton = screen.getByText("Clear completed");
    await fireEvent.click(clearButton);

    expect(mockLocalStorage.setItem).toHaveBeenCalled();
    const tasksAfterClear = JSON.parse(
      mockLocalStorage.setItem.mock.calls[0][1],
    );
    expect(tasksAfterClear).toHaveLength(1);
    expect(tasksAfterClear[0].text).toBe("Task 1");
  });
});
