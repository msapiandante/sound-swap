import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // <main className="flex-row justify-center mb-4">
    //   <div className="col-12 col-lg-10">
    <div className="container my-1">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <div className="card-body">
        {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className='form-label'>First Name:</label>
              <input
                className="form-control"
                // placeholder="Please Enter Your First Name"
                name="firstName"
                type="text"
                value={formState.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className='form-label'>Last Name:</label>
              <input
                className="form-control"
                // placeholder="Please Enter Your Last Name"
                name="lastName"
                type="text"
                value={formState.lastName}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email:</label>
              <input
                className="form-control"
                // placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password:</label>
              <input
                className="form-control"
                // placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className='d-grid'>
              <button
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
    </div>
    //   </div>
    // </main>
  );
};

export default Signup;

