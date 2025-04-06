import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Adminintro from './Adminintro';
import AdminAbout from './AdminAbout';
import AdminExperience from './AdminExperience';
import AdminProject from './AdminProject';
import AdminCourse from './AdminCourse';

const { TabPane } = Tabs;

const Admin = () => {
  const [tabPosition, setTabPosition] = useState('left');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken"); // ✅ Correct token name
    if (!token) {
      navigate("/admin-login"); // ✅ Use React Router for navigation
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? 'top' : 'left');
    };

    handleResize(); // Set initial position
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // ✅ Clear token on logout
    navigate("/admin-login");
  };

  return (
    <>
      <Header />
      <div className="pt-32 px-4 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="flex flex-col">
          <Tabs
            defaultActiveKey="1"
            tabPosition={tabPosition}
            className="w-full"
            tabBarGutter={12}
            tabBarStyle={{
              minWidth: 150,
            }}
          >
            <TabPane tab="Intro" key="1">
              <Adminintro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <AdminExperience />
            </TabPane>
            <TabPane tab="Projects" key="4">
              <AdminProject />
            </TabPane>
            <TabPane tab="Courses" key="5">
              <AdminCourse />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
