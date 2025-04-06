import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';

const AdminIntro = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch intro data on mount
  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/intro');
        const introData = response.data;

        // Populate the form with existing data
        form.setFieldsValue({
          welcomeText: introData.welcomeText || '',
          firstName: introData.firstName || '',
          lastName: introData.lastName || '',
          caption: introData.caption || '',
          description: introData.description || '',
        });
      } catch (error) {
        console.error('Error fetching intro data:', error);
        message.error('Failed to load intro data.');
      }
    };

    fetchIntro();
  }, [form]);

  // Submit handler
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put('http://localhost:5000/api/portfolio/intro', values); // PUT for update
      message.success('Intro updated successfully!');
    } catch (error) {
      console.error('Error updating intro:', error);
      message.error('Failed to update intro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-2xl mx-auto text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-tertiary">Edit Intro</h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="text-white"
      >
        <Form.Item
          label="Welcome Text"
          name="welcomeText"
          rules={[{ required: true, message: 'Please enter welcome text' }]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input className="rounded-md" />
          </Form.Item>
        </div>

        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ required: true, message: 'Please enter a caption' }]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea rows={4} className="rounded-md" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-tertiary text-white hover:bg-white hover:text-tertiary transition"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminIntro;
