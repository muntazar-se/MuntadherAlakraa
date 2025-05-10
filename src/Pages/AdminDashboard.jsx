import React from 'react';
import Sidebar from '../../public/components/Sidebar';
import Header from '../../public/components/Header';
import DashboardCards from '../../public/components/DashboardCards';
import UsersTable from '../../public/components/UsersTable';

export default function AdminDashboard() {
  return (
    <div className="flex bg-[#0f1624] min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-4">
        <Header />
        <DashboardCards />
        <UsersTable />
      </div>
    </div>
  );
}
