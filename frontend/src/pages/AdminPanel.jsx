import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography, Layout, Menu } from "antd";

import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddFood from "../components/AddFood";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setallOrders] = useState([]);
  const [foodItems, setfoodItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    //Fetching All users from backend
    if (!(user.isAdmin && user.firstname === "admin")) {
      alert("You are not an admin");
      navigate("/");
    } else if (user.isAdmin && user.firstname === "admin") {
      const fetchUsers = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/users");
          const data = res.data;
          setAllUsers(data);
        } catch (error) {
          console.log(error);
        }
      };

      //Fetching All Orders from backend
      const fetchOrders = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/UserOrders/getOrder"
          );
          const data = res.data;
          setallOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
      //Fetching All FoodItems from backend
      const fetchFood = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/getfood");
          const data = res.data;
          setfoodItems(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
      fetchOrders();
      fetchFood();
    } else {
      alert("Something went wrong !");
      navigate("/");
    }
  }, []);
  console.log(allUsers);
  console.log(foodItems);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <Title level={3}>Dashboard</Title>
            <p>
              Welcome to the admin dashboard. Here you can view stats and
              summary.
            </p>

            <Row gutter={16} style={{ marginTop: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Orders"
                    value={allOrders.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total FoodItems"
                    value={foodItems.length}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Users"
                    value={allUsers.length}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Card>
              </Col>
            </Row>
          </>
        );

      case "orders":
        return (
          <>
            <Title level={3}>Orders</Title>
            <p>Manage all customer orders here.</p>
            <div className="overflow-x-auto p-4">
              <div className="shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <table className="min-w-full bg-white text-sm text-gray-700">
                  <thead className="bg-slate-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        OrderID
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        userId
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        UserName
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        amount
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Address
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        PaymentId
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Orders
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Admin
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((user, index) => (
                      <tr
                        key={user._id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2 border border-gray-300">
                          {user._id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.userId}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.userName}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          &#8377;{user.amount}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.address}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.paymentId}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.Orders.map((item) => (
                            <tr>
                              <td className="px-4 py-2 border border-gray-300">
                                {item.name}: <strong>Qty :</strong>
                                {item.quantity} | <strong>{item.option}</strong>
                              </td>
                            </tr>
                          ))}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.isAdmin === true ? (
                            <span className="text-green-600 font-semibold">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case "foods":
        return (
          <>
            <Title level={3}>Foods</Title>
            <p>View and manage all food items.</p>

            <div className="overflow-x-auto p-4">
              <div className="shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <table className="min-w-full bg-white text-sm text-gray-700">
                  <thead className="bg-slate-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        ID
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        FoodImage
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Options
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodItems.map((food, index) => (
                      <tr
                        key={food._id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2 border border-gray-300">
                          {food._id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {food.name}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {food.CategoryName}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <img src={food.img} className="w-[100px] h-[100px]" />
                        </td>

                        <td className="px-4 py-2 border border-gray-300">
                          {Object.entries(food.options[0]).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="px-4 py-2 border border-gray-300">
                                  {key}: {value}
                                </td>
                              </tr>
                            )
                          )}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {food.description}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {/* {new Date(food.createdAt).toLocaleString()} */}
                          {food.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case "users":
        return (
          <>
            <Title level={3}>Users</Title>
            <p>View and manage registered users.</p>
            <div className="overflow-x-auto p-4">
              <div className="shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <table className="min-w-full bg-white text-sm text-gray-700">
                  <thead className="bg-slate-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        ID
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        First Name
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Last Name
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Phone
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Address
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Admin
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-300">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2 border border-gray-300">
                          {user._id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.firstname}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.lastname}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.email}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.phone}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.address}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {user.isAdmin ? (
                            <span className="text-green-600 font-semibold">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case "add-food":
        return (
          <>
            <Title level={3}>Add New Food</Title>
            <AddFood />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ background: "#001529" }}
        >
          <div
            className="logo"
            style={{ padding: "16px", textAlign: "center" }}
          >
            <Title level={3} style={{ color: "white", margin: 0 }}>
              FoodGo
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            onClick={({ key }) => setActiveTab(key)}
            selectedKeys={[activeTab]}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
              Orders
            </Menu.Item>
            <Menu.Item key="foods" icon={<AppstoreOutlined />}>
              Foods
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <Menu.Item key="add-food" icon={<PlusCircleOutlined />}>
              Add Food
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Header style={{ background: "#fff", padding: "0 24px" }}>
            <Title level={2} style={{ margin: 0 }}>
              Admin Panel - FoodGo
            </Title>
          </Header>
          <Content style={{ margin: "24px", padding: 24, background: "#fff" }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </>
  );
}

export default AdminPanel;
