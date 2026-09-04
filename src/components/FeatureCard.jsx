import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon, color = "bg-blue-50 text-blue-800 border-blue-200", index = 0 }) {
  // Dynamically map icon component from Lucide React
  const IconComponent = Icons[icon] || Icons.CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
    >
      <div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${color} mb-5 group-hover:scale-110 transition-transform`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#3d2b29] group-hover:text-amber-800 transition-colors mb-2.5">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
