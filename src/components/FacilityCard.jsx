import React from 'react';
import * as Icons from 'lucide-react';
import { images } from '../data/images';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function FacilityCard({ facility, index = 0 }) {
  const IconComponent = Icons[facility.icon] || Icons.Building2;
  const imageUrl = facility.image || facility.url || images[facility.imageKey] || images.aboutCampus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card-hover overflow-hidden transition-all duration-300 group flex flex-col h-full"
    >
      {/* Image container with zoom hover effect */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={facility.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
        
        {/* Floating Icon Badge */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-blue-900 text-white shadow-md flex items-center justify-center border border-blue-800">
          <IconComponent className="w-5 h-5" />
        </div>

        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white tracking-tight drop-shadow-sm">
          {facility.title}
        </h3>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {facility.description}
        </p>

        {facility.features && (
          <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
            {facility.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
