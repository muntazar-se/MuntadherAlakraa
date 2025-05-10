import React from 'react';

export default function UsersTable() {
  const users = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' },
    { name: 'Carol', email: 'carol@example.com', role: 'Editor' },
  ];

  return (
    <div className="bg-[#1b2437] p-4 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-4">User List</h3>
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-600">
          <tr>
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-b border-gray-700 hover:bg-[#2a3145]">
              <td className="py-2">{u.name}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

