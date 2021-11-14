import "./App.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { ThemeProvider } from "styled-components";

axios.defaults.baseURL = "http://192.168.1.104:3000/api";

export default function App() {
  const theme = store.getState().theme;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id totam nisi dolor praesentium
            ullam distinctio corrupti debitis. In, rerum mollitia! Adipisci excepturi dicta soluta
            veritatis odio voluptatum cupiditate, magni aperiam!
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
