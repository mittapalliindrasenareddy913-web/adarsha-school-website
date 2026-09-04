import React from 'react';
import * as Icons from 'lucide-react';
import DemoNotice from './DemoNotice';
import { motion } from 'framer-motion';

export default function AchievementCard({ achievement, index = 0 }) {
  const IconComponent = Icons[achievement.icon] || Icons.Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {achievement.year}
          </span>
        </div>

        <span className="inline-block text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
          {achievement.category}
        </span>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
          {achievement.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {achievement.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <DemoNotice text={achievement.badge || "Demo Achievement"} />
      </div>
    </motion.div>
  );
}
