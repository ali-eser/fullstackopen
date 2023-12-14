import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationSlice
  }
})


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
