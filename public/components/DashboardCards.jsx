import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardCards() {
  const cards = [
    { label: 'Users', value: 120 },
    { label: 'Sales', value: '$5.2K' },
    { label: 'Visitors', value: 987 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          className="p-6 bg-[#1b2437] text-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
        >
          <p className="text-sm text-gray-400">{card.label}</p>
          <h2 className="text-2xl font-semibold">{card.value}</h2>
        </motion.div>
      ))}
    </div>
  );
}

