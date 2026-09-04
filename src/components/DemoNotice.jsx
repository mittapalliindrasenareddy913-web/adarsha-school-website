import React from 'react';
import { Info } from 'lucide-react';

export default function DemoNotice({ text = "Demo Content — Replace with official details" }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs">
      <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      <span>{text}</span>
    </div>
  );
}
