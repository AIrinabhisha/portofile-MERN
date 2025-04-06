import React, { useEffect, useState } from 'react';
import {
  Card, Row, Col, Typography, Button,
  Popconfirm, message, Modal, Form, Input
} from 'antd';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/portfolio/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      message.error("Failed to load experiences.");
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/portfolio/experience/${id}`);
      message.success("Experience deleted successfully");
      setExperiences((prev) => prev.filter(exp => exp._id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
      message.error("Failed to delete experience");
    }
  };

  const handleAddExperience = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/portfolio/experience', values);
      message.success("Experience added successfully");
      form.resetFields();
      setIsModalVisible(false);
      fetchExperiences();
    } catch (error) {
      console.error("Error adding experience:", error);
      message.error("Failed to add experience");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Experience</Title>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Experience
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {experiences.map((exp) => (
          <Col span={24} key={exp._id}>
            <Card
              bordered
              style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              extra={
                <Popconfirm
                  title="Delete this experience?"
                  onConfirm={() => handleDelete(exp._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger size="small">Delete</Button>
                </Popconfirm>
              }
            >
              <Title level={4} style={{ marginBottom: 0 }}>
                {exp.title} @ {exp.company}
              </Title>
              <Text type="secondary">{exp.period}</Text>

              {exp.expression && (
                <Paragraph italic style={{ marginTop: 10, color: '#888' }}>
                  {exp.expression}
                </Paragraph>
              )}

              <Paragraph style={{ marginTop: 10 }}>{exp.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Experience Modal */}
      <Modal
        title="Add New Experience"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleAddExperience}>
          <Form.Item name="company" label="Company" rules={[{ required: true }]}>
            <Input placeholder="e.g. Google" />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Frontend Developer" />
          </Form.Item>
          <Form.Item name="period" label="Period" rules={[{ required: true }]}>
            <Input placeholder="e.g. Jan 2022 - Dec 2022" />
          </Form.Item>
          <Form.Item name="expression" label="Expression">
            <Input.TextArea rows={2} placeholder="Short highlight or quote (optional)" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Describe your role, contributions, and projects." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminExperience;
