import "./App.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import TodoLists from "./components/todoLists";

axios.defaults.baseURL = "http://192.168.1.104:3000/api";

export default function App() {
  const theme = store.getState().theme;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<TodoLists />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
