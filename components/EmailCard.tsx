"use client";

import React, { useState } from 'react';
import { Mail, Check, Archive, ExternalLink, Sparkles, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface EmailData {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  date: string;
  summary: string[];
  isImportant: boolean;
  category: 'Urgent' | 'Action Required' | 'FYI';
}

export function EmailCard({ email }: { email: EmailData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`glass-panel rounded-xl mb-4 transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/30 group ${
        expanded ? 'shadow-lg shadow-primary/5' : 'hover:shadow-md'
      }`}
    >
      <div 
        className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate text-foreground/90">{email.sender}</span>
            <span className="text-xs text-foreground/50 whitespace-nowrap hidden sm:inline-block">
              {formatDistanceToNow(new Date(email.date), { addSuffix: true })}
            </span>
          </div>
          <h3 className="text-sm font-medium text-foreground truncate">{email.subject}</h3>
          {!expanded && (
            <p className="text-sm text-foreground/60 truncate mt-1">{email.snippet}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${
            email.category === 'Urgent' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
            email.category === 'Action Required' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
            'bg-blue-500/10 text-blue-500 border border-blue-500/20'
          }`}>
            <Sparkles size={12} />
            {email.category}
          </span>
        </div>
      </div>

      <div 
        className={`px-4 pb-4 overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pb-0'
        }`}
      >
        <div className="border-t border-border pt-4">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles size={14} /> AI TL;DR
            </h4>
            <ul className="space-y-2">
              {email.summary.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <ActionButton icon={<Check size={16} />} label="Mark as Read" />
            <ActionButton icon={<Archive size={16} />} label="Archive" />
            <ActionButton icon={<ExternalLink size={16} />} label="Open in Gmail" variant="outline" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, variant = 'ghost' }: { icon: React.ReactNode, label: string, variant?: 'ghost' | 'outline' }) {
  return (
    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      variant === 'ghost' 
        ? 'bg-foreground/5 hover:bg-foreground/10 text-foreground/80' 
        : 'border border-border hover:border-foreground/30 hover:bg-foreground/5 text-foreground/80'
    }`}>
      {icon}
      {label}
    </button>
  );
}
