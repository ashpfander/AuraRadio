import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
    <form onSubmit={handleSubmit} className="col-5">
      <div className="mb-3">
        <label for="username" className="form-label">Username:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="form-button p-3 me-3 col-2">Log In</button>
      <a href="/signup">Don't have a log in? Sign Up</a>
    </form>
    </div>
  );
}

export default LoginForm;
