"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  startEdit,
  editTodo,
  cancelEdit,
} from "../../_store/todoSlice";
import { RootState } from "../../_store";
import styles from "./TodoList.module.scss";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const { items, editingId } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue("");
    }
  };

  const handleStartEdit = (id: number, text: string) => {
    dispatch(startEdit(id));
    setEditValue(text);
  };

  const handleSaveEdit = (id: number) => {
    if (editValue.trim()) {
      dispatch(editTodo({ id, text: editValue.trim() }));
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    dispatch(cancelEdit());
    setEditValue("");
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Todo List</h1>

      <form onSubmit={handleAddTodo} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          Add Todo
        </button>
      </form>

      <div className={styles.todoList}>
        {items.length === 0 ? (
          <p className={styles.emptyMessage}>No todos yet. Add one above!</p>
        ) : (
          items.map((todo) => (
            <div key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className={styles.checkbox}
              />

              {editingId === todo.id ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={styles.editInput}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEdit(todo.id);
                      }
                      if (e.key === "Escape") {
                        handleCancelEdit();
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className={styles.saveButton}
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={styles.cancelButton}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`${styles.todoText} ${
                      todo.completed ? styles.completed : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleStartEdit(todo.id, todo.text)}
                      className={styles.editButton}
                      disabled={todo.completed}
                      title="Edit todo"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className={styles.deleteButton}
                      title="Delete todo"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
