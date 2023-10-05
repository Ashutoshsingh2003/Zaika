import { useState } from "react";
import React from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ password: "", email: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/loginuser", {
        email: credentials.email,
        password: credentials.password
      });

      console.log(response.data);
      if (response.data.success) {
        navigate('/')
        window.localStorage.setItem('userEmail',credentials.email)
        window.localStorage.setItem('token',response.data.authToken)
      }
      else
      alert("enter valid credentials")

    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">I am new user</Link>
        </form>
      </div>
    </>
  )
}
