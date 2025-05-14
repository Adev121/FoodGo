import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    const userInfo = {
      email: email,
      password: password,
    };
    console.log(userInfo);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userInfo
      );
      console.log(response.data);
      if (response.status === 200) {
        
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setTimeout(() => {
          Swal.fire({
          title: "Awesome!",
          text: `${response.data.message}`,
          icon: "success",
        });
        setLoading(false);
        setTimeout(()=>{
          window.location.href = "/"
        },1000)
          
        }, 3000);
      } else {
        Swal.fire({
          title: "Error!",
          text: `${response.response.data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: `${error.response.data.message}`,
        icon: "error",
      });
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    // Add your signup logic here
    console.log("Signup successful");
  };
  return (
    <>
      {loading=== false ? (
        <>
          <Navbar />
          <div className="border-2 box-border w-[420px] m-auto mt-20 mb-20 p-2 shadow-lg rounded-lg">
            <div className="flex-1">
              <Link to={"/"} className="btn btn-ghost text-2xl font-bold">
                <span>
                  Foody<span className="text-green-500">Go</span>
                </span>
              </Link>
            </div>
            <form className="max-w-sm mx-auto px-2" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  name="email"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-white dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  className="ms-2 text-sm font-medium text-blue-900 dark:text-slate-800"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-slate-800 py-2">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
          <Footer />
        </>
      ) : (
        <div className="flex justify-center items-center mt-4 h-screen">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default Login;
