// AdminLogin.js
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AdminLogin = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (values) => {
    const { username, password } = values;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      message.success("Login successful");
      localStorage.setItem("adminToken", res.data.token);

      if (onSuccess) onSuccess(res.data.admin);
      navigate("/admin"); // Redirect to admin dashboard
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <Title level={3} className="text-center mb-6">
          Admin Login
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="adminuser" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
