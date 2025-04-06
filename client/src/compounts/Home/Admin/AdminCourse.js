import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input
} from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        message.error('Failed to load courses');
      }
    };

    fetchCourses();
  }, []);

  // Add new course
  const handleAddCourse = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/portfolio/courses', values);
      setCourses(prev => [...prev, response.data]);
      message.success('Course added successfully');
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding course:', error);
      message.error('Failed to add course');
    }
  };

  // Delete a course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/portfolio/courses/${id}`);
      setCourses(prev => prev.filter(course => course._id !== id));
      message.success('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      message.error('Failed to delete course');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Admin - Courses</Title>

      <Button
        type="primary"
        style={{ marginBottom: '20px' }}
        onClick={() => setModalVisible(true)}
      >
        Add Course
      </Button>

      <Row gutter={[16, 16]}>
        {courses.map(course => (
          <Col span={24} key={course._id}>
            <Card
              title={course.name}
              extra={
                <Popconfirm
                  title="Delete this course?"
                  onConfirm={() => handleDelete(course._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger size="small">Delete</Button>
                </Popconfirm>
              }
              style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <Paragraph strong>Domain: {course.domain}</Paragraph>
              <Paragraph>Description: {course.description}</Paragraph>
              <img src={course.img} alt={course.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Add New Course"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCourse}
        >
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the course name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Domain"
            name="domain"
            rules={[{ required: true, message: 'Please enter the domain' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="img"
            rules={[{ required: true, message: 'Please enter the image URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Course
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCourse;
