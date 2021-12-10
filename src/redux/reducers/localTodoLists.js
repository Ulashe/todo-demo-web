import { createSelector, createSlice } from "@reduxjs/toolkit";

const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

const todoList = (payload) => ({
  _id: uniqueId(),
  title: payload.title,
  todos: payload.todos.map((todo) => ({ text: todo.text, isCompleted: false })),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const slice = createSlice({
  name: "localTodoLists",
  initialState: [
    {
      _id: "kw7koihh3i7g2kjtuoy",
      title: "Kahvaltı Listesi",
      createdAt: "2021-11-20T08:52:25.840Z",
      updatedAt: "2021-11-20T08:52:25.840Z",
      todos: [
        { text: "Süt", isCompleted: false },
        { text: "Yumurta", isCompleted: false },
        { text: "Peynir", isCompleted: true },
        { text: "Zeytin", isCompleted: false },
        { text: "Ekmek", isCompleted: true },
      ],
    },
    {
      _id: "kw7ks5n6c8hqnmkpp2",
      title: "Alışveriş Listesi",
      createdAt: "2021-11-20T09:00:17.060Z",
      updatedAt: "2021-11-20T09:00:17.060Z",
      todos: [
        { text: "Pantolon", isCompleted: false },
        { text: "Spor ayakkabı", isCompleted: false },
        { text: "Ceket", isCompleted: false },
        { text: "Tişört", isCompleted: true },
      ],
    },
  ],
  reducers: {
    addTodoList: (state, action) => {
      state.push(todoList(action.payload));
    },
    addTodoToList: (state, action) => {
      const index = state.findIndex((i) => i._id == action.payload._id);
      if (index + 1) {
        state[index].todos.push({ text: action.payload.todo.text, isCompleted: false });
      }
    },
    updateTodoList: (state, action) => {
      const index = state.findIndex((i) => i._id == action.payload._id);
      if (index + 1) {
        state[index] = action.payload;
      }
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((i) => i._id == action.payload._id);
      if (index + 1) {
        const todoIndex = state[index].todos.findIndex((i) => i._id == action.payload.todo._id);
        if (todoIndex + 1) {
          state[index].todos[todoIndex] = action.payload.todo;
        }
      }
    },
    removeTodoFromTodoList: (state, action) => {
      const index = state.findIndex((i) => i._id == action.payload._id);
      if (index + 1) {
        state[index].todos = state[index].todos.filter((i) => i != action.payload.todo._id);
      }
    },
    deleteTodoList: (state, action) => {
      const index = state.findIndex((i) => i._id == action.payload._id);
      if (index + 1) {
        return state.filter((i) => i._id != action.payload._id);
      }
    },
  },
});

export const getAllLocalTodoLists = createSelector(
  (state) => state.localTodoLists,
  (localTodoLists) => localTodoLists
);

export const {
  addTodoList,
  addTodoToList,
  deleteTodoList,
  removeTodoFromTodoList,
  updateTodoList,
  updateTodo,
} = slice.actions;

export default slice.reducer;
