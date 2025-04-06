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
  Input,
} from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const AdminProject = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      message.error('Failed to load projects');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/portfolio/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      message.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      message.error('Failed to delete project');
    }
  };

  const showEditModal = (project) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setEditingProject(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    if (editingProject) {
      // Update
      try {
        await axios.put(
          `http://localhost:5000/api/portfolio/projects/${editingProject._id}`,
          values
        );
        message.success('Project updated successfully');
        setIsModalVisible(false);
        setEditingProject(null);
        fetchProjects();
      } catch (error) {
        console.error('Error updating project:', error);
        message.error('Failed to update project');
      }
    } else {
      // Create
      try {
        await axios.post('http://localhost:5000/api/portfolio/projects', values);
        message.success('Project added successfully');
        setIsModalVisible(false);
        form.resetFields();
        fetchProjects();
      } catch (error) {
        console.error('Error adding project:', error);
        message.error('Failed to add project');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Admin - Projects</Title>
        <Button type="primary" onClick={showAddModal}>
          Add Project
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col span={24} key={project._id}>
            <Card
              title={project.name}
              extra={
                <>
                  <Button
                    type="link"
                    onClick={() => showEditModal(project)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete this project?"
                    onConfirm={() => handleDelete(project._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger size="small">Delete</Button>
                  </Popconfirm>
                </>
              }
              style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <Paragraph>{project.description}</Paragraph>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingProject ? "Edit Project" : "Add New Project"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText={editingProject ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="github" label="GitHub Link" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProject;
