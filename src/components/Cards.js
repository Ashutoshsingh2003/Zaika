import { React, useRef, useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Cards(props) {

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.fooditem;
  let data = useCart();

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const dispatch = useDispatchCart();
  const priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {

    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    console.log(data);
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

 

  return (
    <div>
      <div className="card mt-3" style={{ "width": "18rem", 'maxHeight': '360px' }}>
        <img className="card-img-top" src={foodItem.img} alt=" Helo" style={{ height: "150px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title text-center">{foodItem.name}</h5>
          <div className='container w-100 ' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-25 bg-success rounded" style={{ select: "#FF0000" }} onChange={(e) => setQty(e.target.value)} >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100  bg-success text-black rounded" ref={priceRef} style={{ select: "#FF0000" }} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>

            <div className=' d-inline  h-100  fs-5' >
               ${finalPrice}/- 
            </div>
          </div>
          <hr>
          </hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
