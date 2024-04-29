import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email, password }
      });
      onLoginSuccess(data.login.token);  
    } catch (e) {
      console.error('Error logging in:', e);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
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

