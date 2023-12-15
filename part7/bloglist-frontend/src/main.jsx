import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import notificationSlice from './reducers/notificationReducer'
import blogSlice from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);