const Notification = ({ message, isPositive }) => {
    let messageStyle
    if (message === null) {
        return null
    } else {
        if (isPositive === false) {
            messageStyle = {
                color: 'red',
                borderRadius: 7,
                fontSize: 17
            }
        } else {
            messageStyle = {
                color: 'green',
                borderRadius: 7,
                fontSize: 17
            }
        }
    }
    return (
        <div style={messageStyle}>{message}</div>
    )
}

export default Notification