import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Carousal from '../components/Carousal'
import { Card } from 'react-bootstrap'
import axios from 'axios';

export default function Home() {
  
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);



  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    setFoodItem(response.fetched_data)
    setFoodCat(response.foodCategory)

  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <>

      <div><Navbar></Navbar></div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel">
    <div className="carousel-caption " style={{"zIndex":"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?fruit" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?chicken" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      <div className='container'> 
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {foodItem !== [] ? foodItem.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Cards   options={filterItems.options[0]} fooditem={filterItems} ></Cards>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>




      {/* <div className='container'> 
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data.id} className=' m-3'>
                    {data.CategoryName}
                    <Cards></Cards>
                  </div>
                  <hr/>
                </div>
              )
            })
            : ""}
            
      </div> */}
      <div><Footer></Footer></div>
    </>
  )
}
