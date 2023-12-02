import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  console.log('notification: ', notification)

  let visibility = 'none'

  if (notification !== '') {
    visibility = 'block'
  }

  const style = {
    display: visibility,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification