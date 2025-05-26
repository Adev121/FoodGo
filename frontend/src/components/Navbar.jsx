import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeController from "./ThemeController";
import userlogo from "../assets/user.png";
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector } from "react-redux";


function Navbar({filterBySearch}) {
  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const getCart = useSelector((state) => state.cartreducer.carts);
  console.log(getCart)

  const handleLogout=()=>{
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div>
      <div className="navbar bg-slate-300">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-2xl font-bold font-[poppins]">
            <span>
              Foody<span className="text-green-500">Go</span>
            </span>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              onChange={(e) => filterBySearch(e.target.value)}
            />
          </div>
          <div>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-[poppins]">
              <Link to={"/"} className="mr-5 hover:text-gray-900">
                Home
              </Link>
              <Link to={"/"} className="mr-5 hover:text-gray-900">
                Second Link
              </Link>
              <Link to={"/contacts"} className="mr-5 hover:text-gray-900">
                Contacts
              </Link>
              <Link to={"/about"} className="mr-5 hover:text-gray-900">
                About us
              </Link>
            </nav>
          </div>

          {/* Drop down for Logged in User  */}
          {!user ? (
            <button className="btn btn-secondary font-bold">
              <Link to={"/login"}>Login/Signup</Link>
            </button>
          ) : (
            <>
            <div className="relative w-10">
              <Link to={'/cartpage'}>
                <IoFastFoodOutline style={{fontSize:"2rem"}}/></Link>
                {
                  getCart.length === 0 ? null : <span className="badge badge-sm indicator-item absolute top-0 right-0 rounded-full bg-red-700 text-white">{getCart.length}</span>
                }
                
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={userlogo} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between font-bold">
                    {user.firstname}
                    <span className="badge bg-pink-200">New</span>
                  </a>
                </li>
                <li>
                  <Link to={"/orders"}>Orders</Link>
                </li>
                <li onClick={handleLogout}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
            </>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
