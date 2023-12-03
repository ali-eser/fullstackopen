import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  let visibility = 'none'

  if (notification != '') {
    visibility = 'block'
  }

  const style = {
    display: visibility,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
