import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", password: "", email: "", geolocation: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post("http://localhost:5000/api/createuser", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation
          });
    
          console.log(response.data);
          if (!response.data.success) {
            alert("Enter Credentials");
          }
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation}  onChange={onChange} aria-describedby="emailHelp"  id='lllolo'/>

                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </>
    )
}
