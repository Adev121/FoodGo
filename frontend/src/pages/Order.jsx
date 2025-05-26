import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Order() {
  const [order, setOrder] = useState([]);
  const [temp, setTemp] = useState([]);
  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/UserOrders/fetchOrders",
          {
            userId: User._id,
          }
        );
        const data = res.data;
        if (res.status === 200) {
          console.log(data);
          setTemp(res.data);
          const allItems = [];

        //   data.forEach((item) => {
        //     allItems.push(...item.Orders);
        //   });

        data.forEach((item) => {
  item.Orders.forEach((orderItem) => {
    allItems.push({
      ...orderItem,
      updatedAt: item.updatedAt,  // attach updatedAt from parent
      createdAt: item.createdAt,  // (optional) attach createdAt
    });
  });
});

          // Now allItems contains a flat array of all items from all orders
          setOrder(allItems); // if using React state

          console.log(allItems);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);
console.log(temp);

  console.log(order);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 border-b pb-4">
            Your Orders
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm text-left">
              <thead className="bg-gray-200 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 border-b">Name</th>
                  <th className="px-6 py-3 border-b">Price</th>
                  <th className="px-6 py-3 border-b">Quantity</th>
                  <th className="px-6 py-3 border-b">Option</th>
                  <th className="px-6 py-3 border-b">Image</th>
                  <th className="px-6 py-3 border-b">Order_Dt</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4 border-b font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600">
                      {item.option}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600">
                      <img
                        src={item.img}
                        className="w-[100px] h-[100px]"
                        alt=""
                        srcset=""
                      />
                    </td>
                    <td
                      className="px-6 py-4 border-b text-gray-600"
                      id="createdAt"
                    >
                       {item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Order;
