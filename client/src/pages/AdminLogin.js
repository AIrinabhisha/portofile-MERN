// adminLogin.js
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Login from "./Login";

const AdminLoginModal = ({ isOpen, setIsOpen, onLoginSuccess }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
          <Dialog.Title className="text-lg font-bold mb-4">Admin Login</Dialog.Title>
          <Login onSuccess={(admin) => {
            onLoginSuccess(admin);
            setIsOpen(false);
          }} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AdminLoginModal;
