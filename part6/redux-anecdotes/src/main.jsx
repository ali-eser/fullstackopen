import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteSlice from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    filter: filterSlice,
    notification: notificationSlice
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)