import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  editingId: number | null;
}

const initialState: TodoState = {
  items: [],
  editingId: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.items.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
      state.editingId = null;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    startEdit: (state, action: PayloadAction<number>) => {
      state.editingId = action.payload;
    },
    cancelEdit: (state) => {
      state.editingId = null;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  startEdit,
  cancelEdit,
} = todoSlice.actions;
export default todoSlice.reducer;
