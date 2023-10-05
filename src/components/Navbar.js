import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import { useState } from "react";
import Modal from '../Modal';
import { useCart } from './ContextReducer';

export default function Navbar() {

  const [cartView, setCartView] = useState(false)
  let data = useCart();
 
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')

    navigate("/login")
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">Zaika</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("token")) ?
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                </li> : ""}

            </ul>
           
            {(localStorage.getItem("token")) ?
             
               <div>
               <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>Cart {"  "}
               <Badge pill bg="danger">{data.length}</Badge>
               </div>
       
               {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}


               <div className='btn bg-white text-success mx-2' onClick={handleLogout}>Logout</div>
             </div>:
              <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createUser">Signup</Link>
              </div>
            }
            
          </div>
        </div>
      </nav>
    </div>
  )
}
