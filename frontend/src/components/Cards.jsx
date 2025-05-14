import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
function Cards({ item }) {
  const [option, setOption] = useState(
    Object.keys(item.options[0]).includes("full")
      ? "full"
      : Object.keys(item.options[0])[0]
  ); //Object.keys(item.options[0])
  const [qty, setQty] = useState(1);
  console.log(option);
  console.log(qty);
  const user = JSON.parse(localStorage.getItem("user"));

  // const sweetAlert = () => {
  //   Swal.fire({
  //     title: "Woohoo!",
  //     text: "Added to cart",
  //     icon: "success",
  //   });
  // };
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (user === null) {
      return alert("Please login first");
    } else {
      dispatch({
        type: "ADD_CART",
        payload: {
          id: item._id,
          name: item.name,
          CategoryName: item.CategoryName,
          img: item.img,
          price: item.options[0][option] * qty,
          quantity: qty,
          option: option,
        },
      });
      // sweetAlert()
      toast.success("Added to cart");
    }
  };

  const getCart = useSelector((state) => state.cartreducer.carts);
  console.log(getCart);

  return (
    <div>
      <div className="card bg-base-100 w-80 shadow-xl rounded-xl m-4 border border-slate-100">
        <figure>
          <img
            src={item.img}
            alt="Shoes"
            className="rounded-t-xl h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body bg-gradient-to-b from-yellow-100 to-yellow-500 rounded-b-xl">
          <h2 className="card-title text-xl text-orange-600">
            {item.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            Category : <span className="font-bold">{item.CategoryName}</span>
          </p>
          <div className="card-actions justify-between items-center">
            <select
              name="qty"
              id="qty"
              max="5"
              defaultValue={1}
              className="border border-slate-800 outline-none w-24 h-10 rounded-lg max-w-xs"
              onChange={(e) => setQty(e.target.value)}
            >
              <option value="1" className="text-center">
                1
              </option>
              <option value="2" className="text-center">
                2
              </option>
              <option value="3" className="text-center">
                3
              </option>
              <option value="4" className="text-center">
                4
              </option>
              <option value="5" className="text-center">
                5
              </option>
            </select>
            <select
              name="qtytype"
              id=""
              defaultValue={"full"}
              className="select select-bordered border-slate-800 w-36 max-w-xs"
              onChange={(e) => setOption(e.target.value)}
            >
              {Object.entries(item.options[0]).map(([option, value], index) => (
                <option value={option} key={index}>
                  {option} - ₹{value}
                </option>
              ))}
            </select>
          </div>
          <div>₹{item.options[0][option] * qty}</div>
          <div>
            <button
              className="btn bg-orange-300 px-5 w-full text-white font-bold hover:bg-orange-400"
              onClick={handleAddToCart}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
