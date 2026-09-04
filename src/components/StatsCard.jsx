import React from 'react';
import * as Icons from 'lucide-react';
import DemoNotice from './DemoNotice';
import { motion } from 'framer-motion';

export default function StatsCard({ stat, index = 0 }) {
  const IconComponent = Icons[stat.icon] || Icons.Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all text-center flex flex-col items-center justify-between h-full group"
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <IconComponent className="w-6 h-6" />
      </div>

      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-blue-900">
        {stat.value}
      </div>

      <p className="text-sm font-semibold text-slate-700 mt-1 mb-3">
        {stat.label}
      </p>

      {stat.note && (
        <DemoNotice text={stat.note} />
      )}
    </motion.div>
  );
}
