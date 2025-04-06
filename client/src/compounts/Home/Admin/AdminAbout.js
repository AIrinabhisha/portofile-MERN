import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const AdminAbout = () => {
  const [form] = Form.useForm();

  // Fetch existing about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/about');
        const aboutData = response.data;

        // Convert skills array to comma-separated string
        const skillsString = aboutData.skills ? aboutData.skills.join(', ') : '';

        // Set data into the form
        form.setFieldsValue({
          description1: aboutData.description1,
          description2: aboutData.description2,
          skills: skillsString,
        });
      } catch (error) {
        console.error('Error fetching about data:', error);
        message.error('Failed to load about data.');
      }
    };

    fetchAbout();
  }, [form]);

  const onFinish = async (values) => {
    // Convert comma-separated string into array
    const skillsArray = values.skills.split(',').map(skill => skill.trim());
    const updatedData = { ...values, skills: skillsArray };

    try {
      console.log('✅ About form submitted:', updatedData);
      await axios.put('http://localhost:5000/api/portfolio/about', updatedData);
      message.success('About section updated successfully!');
    } catch (error) {
      console.error('Error updating about data:', error);
      message.error('Failed to update about section.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-3xl mx-auto text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-tertiary">Edit About Section</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="text-white"
      >
        <Form.Item
          label="Description 1"
          name="description1"
          rules={[{ required: true, message: 'Please enter the first description' }]}
        >
          <TextArea rows={4} className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Description 2"
          name="description2"
          rules={[{ required: true, message: 'Please enter the second description' }]}
        >
          <TextArea rows={4} className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Skills (comma separated)"
          name="skills"
          rules={[{ required: true, message: 'Please enter your skills' }]}
        >
          <Input
            placeholder="e.g. JavaScript, React, Node.js"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-tertiary text-white hover:bg-white hover:text-tertiary transition"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAbout;
