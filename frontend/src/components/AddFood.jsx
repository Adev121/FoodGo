import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import "./loader.css";

const { Option } = Select;

const AddFood = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await axios.post("https://foodgoorder.onrender.com/api/addfood", values);

      if (response.status === 200) {
        toast.success("Food added successfully!");
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error adding food.");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-4 h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Food Name"
              rules={[{ required: true, message: "Please enter food name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="img"
              label="Image URL"
              rules={[{ required: true, message: "Please enter image URL" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="price"
              label="Base Price (₹)"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="CategoryName"
              label="Food Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select
                placeholder="Select category"
                onChange={(value) => setSelectedCategory(value)}
              >
                <Option value="Veg">Veg</Option>
                <Option value="Chicken">Chicken</Option>
                <Option value="Biryani/Rice">Biryani/Rice</Option>
                <Option value="Starter">Starter</Option>
                <Option value="Pizza">Pizza</Option>
              </Select>
            </Form.Item>

            {/* Conditionally render price inputs based on category */}
            {selectedCategory === "Pizza" ? (
              <>
                <Form.Item
                  name={["options", "regular"]}
                  label="Price (Regular)"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="Regular" type="number" />
                </Form.Item>
                <Form.Item
                  name={["options", "medium"]}
                  label="Price (Medium)"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="Medium" type="number" />
                </Form.Item>
                <Form.Item
                  name={["options", "large"]}
                  label="Price (Large)"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="Large" type="number" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name={["options", "half"]}
                  label="Price (Half)"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="Half" type="number" />
                </Form.Item>
                <Form.Item
                  name={["options", "full"]}
                  label="Price (Full)"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="Full" type="number" />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Food
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddFood;
