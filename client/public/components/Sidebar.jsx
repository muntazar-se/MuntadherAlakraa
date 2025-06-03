import React from 'react';
import { FaHome, FaUsers, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Sidebar() {
  return (
    <div className="bg-[#0f1624] text-white w-64 min-h-screen p-6 hidden lg:block">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {[
          { icon: <FaHome />, label: 'Dashboard' },
          { icon: <FaUsers />, label: 'Users' },
          { icon: <FaCog />, label: 'Settings' },
        ].map(({ icon, label }, i) => (
          <motion.li
            key={label}
            className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            {icon}
            <span>{label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
