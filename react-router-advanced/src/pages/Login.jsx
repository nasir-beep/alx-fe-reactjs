function Login({ setIsAuthenticated }) {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => setIsAuthenticated(true)}>
        Login
      </button>
    </div>
  )
}

export default Login
