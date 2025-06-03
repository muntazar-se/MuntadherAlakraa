import React from 'react';

export default function Header() {
  return (
    <div className="w-full bg-[#131b2f] p-4 text-white flex justify-between items-center shadow-sm">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="text-sm text-gray-300">Welcome, Admin</div>
    </div>
  );
}
