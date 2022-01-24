import "./App.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import GlobalCSS from "./theme/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import TodoLists from "./pages/todoLists";
import TodoList from "./pages/todoList";

axios.defaults.baseURL = "https://todo-lists-server.herokuapp.com/api";

export default function App() {
  const theme = store.getState().theme;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalCSS />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<TodoLists />} />
                <Route path="/:id" element={<TodoList />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
