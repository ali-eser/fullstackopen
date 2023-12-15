import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import notificationSlice from './reducers/notificationReducer'
import blogSlice from './reducers/blogReducer'
import userSlice from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    user: userSlice
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);