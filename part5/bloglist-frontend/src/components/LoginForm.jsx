const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          Username: 
            <input 
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="true"/>
        </div>
        <div>
          Password: 
            <input 
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm