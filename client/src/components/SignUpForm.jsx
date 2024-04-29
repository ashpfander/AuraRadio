import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';

function SignUpForm({ onSignUpSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { username, email, password }
      });
      onSignUpSuccess(data.signup.token); // This function should handle what happens on successful signup, like storing the token and redirecting the user
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-5">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <button type="submit" className="form-button p-3 me-3 col-2">Sign Up</button>
        <a href="/login">Already have a log in? Log In</a>
      </form>
    </div>
  );
}

export default SignUpForm;

