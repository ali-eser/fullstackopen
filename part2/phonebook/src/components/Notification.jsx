const Notification = ({ message }) => {
    const messageStyle = {
        color: 'red',
        borderRadius: 7,
        fontSize: 17
    }
    if (message === null) {
        return null
    }
    return (
        <div style={messageStyle}>{message}</div>
    )
}

export default Notification