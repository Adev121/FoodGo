import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { REMOVEITEM } from "../redux/action/action";

function CartPage() {
  const navigate = useNavigate();

  //   const dispatch = useDispatch();
  //   const handleIncrement = (id) => {
  //     dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  //   };

  //   const handleDecrement = (id) => {
  //     dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  //   };

  const dispatch = useDispatch();
  const handleRemove = (id, option) => {
    dispatch(REMOVEITEM(id, option));
    toast.success("Item removed !");
  };

  const getCart = useSelector((state) => state.cartreducer.carts);
  console.log(getCart);
  const totalPrice = getCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  console.log(totalPrice);
  const ShippingCharge = totalPrice > 300 || getCart.length === 0 ? 0 : 50;
  const Gst = Math.round(0.18 * totalPrice);
  const totalAmount = totalPrice + ShippingCharge + Gst;

  const handlePayment = async () => {
    if (getCart.length === 0) {
      alert("Cart is empty");
      return;
    } else {
      try {
        const res = await axios.post(
          "https://foodgo-backend-af04.onrender.com/api/payment/checkout",
          { amount: totalAmount }
        );
        if (res.status === 200) {
          console.log(res.data);
          const options = {
            key: "rzp_test_f8Y5JFvsPLL5sN",
            amount: totalAmount * 100,
            currency: "INR",
            name: "FoodyGo",
            description: "Test Transaction",
            handler: function (response) {
              // setPayId(response.razorpay_payment_id);
              alert("Payment ID: " + response.razorpay_payment_id);
              handleCheckout(response.razorpay_payment_id);
              console.log("Payment Successful");
            },
            theme: {
              color: "#3399cc",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCheckout = async (payid) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user.firstname + " " + user.lastname;
    const userdata = {
      userId: user._id,
      userName: name,
      Orders: getCart,
      amount: totalPrice,
      address: user.address,
      paymentId: payid,
    };
    try {
      const response = await axios.post(
        "https://foodgo-backend-af04.onrender.com/api/UserOrders/Orders",
        userdata
      );
      const data = response.data;
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: `${data.message}`,
          icon: "success",
        });

        setTimeout(() => {
          dispatch({ type: "EMPTY_CART" });
          navigate("/");
        }, 2000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div class="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
        <h1 class="text-xl font-semibold text-slate-900">Shopping Cart</h1>
        <div class="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
          <div class="lg:col-span-2 space-y-6">
            {getCart.length > 0 ? (
              getCart.map((item, index) => (
                <div
                  class="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200"
                  key={index}
                >
                  <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
                    <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                      <img
                        src={item.img}
                        class="w-full h-full object-contain"
                      />
                    </div>
                    <div class="flex flex-col gap-4">
                      <div>
                        <h3 class="text-sm sm:text-base font-semibold text-slate-900">
                          {item.name}
                        </h3>
                        <p class="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">
                          Option: {item.option}
                        </p>
                      </div>
                      <div class="mt-auto">
                        <h3 class="text-sm font-semibold text-slate-900">
                          ₹{item.price}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div class="ml-auto flex flex-col">
                    <div class="flex items-start gap-4 justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                        viewBox="0 0 24 24"
                        onClick={() => handleRemove(item.id, item.option)}
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex items-center gap-3 mt-auto">
                      <button
                        type="button"
                        class="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-400 outline-none rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-2 fill-white"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                      <span class="font-semibold text-base leading-[18px]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        class="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-800 outline-none rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-2 fill-white"
                          viewBox="0 0 42 42"
                        >
                          <path
                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-center items-center h-1/2">
                  <h1 className="text-2xl font-bold">Cart is empty</h1>
                </div>
              </>
            )}
          </div>

          <div class="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
            <ul class="text-slate-500 font-medium space-y-4">
              <li class="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span class="ml-auto font-semibold text-slate-900">
                  &#8377; {totalPrice}
                </span>
              </li>
              <li class="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span class="ml-auto font-semibold text-slate-900">
                  &#8377;{ShippingCharge}
                </span>
              </li>
              <li class="flex flex-wrap gap-4 text-sm">
                GST (18%)
                <span class="ml-auto font-semibold text-slate-900">
                  &#8377;{Gst}
                </span>
              </li>
              <hr class="border-slate-300" />
              <li class="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
                Total{" "}
                <span class="ml-auto">
                  &#8377;{totalPrice + ShippingCharge + Gst}
                </span>
              </li>
            </ul>
            <div class="mt-8 space-y-4">
              <button
                type="button"
                class="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-green-700 hover:bg-green-900 text-white rounded-md cursor-pointer"
                onClick={handlePayment}
              >
                Place Order
              </button>
              <button
                type="button"
                class="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-gray-300 rounded-md cursor-pointer"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
            <div class="mt-5 flex flex-wrap justify-center gap-4">
              <img
                src="http://readymadeui.com/images/master.webp"
                alt="card1"
                class="w-10 object-contain"
              />
              <img
                src="http://readymadeui.com/images/visa.webp"
                alt="card2"
                class="w-10 object-contain"
              />
              <img
                src="http://readymadeui.com/images/american-express.webp"
                alt="card3"
                class="w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
