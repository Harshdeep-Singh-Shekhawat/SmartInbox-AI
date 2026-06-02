"use client";

import React, { useEffect, useState } from 'react';
import { Mail, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { EmailCard, EmailData } from './EmailCard';

export function Dashboard() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [scannedCount, setScannedCount] = useState(0);

  useEffect(() => {
    async function fetchAndAnalyze() {
      try {
        setLoading(true);
        // 1. Fetch raw emails
        const res = await fetch('/api/emails');
        const data = await res.json();
        
        if (data.status === 'success' && data.data) {
          const rawEmails = data.data;
          setScannedCount(rawEmails.length);
          
          setLoading(false);
          setAnalyzing(true);
          
          // 2. Analyze each email
          const analyzedEmails = await Promise.all(
            rawEmails.map(async (email: any) => {
              try {
                const analyzeRes = await fetch('/api/analyze', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    subject: email.subject,
                    sender: email.sender,
                    snippet: email.snippet,
                    content: email.fullContent
                  })
                });
                const analysis = await analyzeRes.json();
                
                return {
                  id: email.id,
                  sender: email.sender,
                  subject: email.subject,
                  snippet: email.snippet,
                  date: email.date,
                  summary: analysis.summary || ['No summary available'],
                  isImportant: analysis.isImportant || false,
                  category: analysis.category || 'FYI'
                };
              } catch (e) {
                return { ...email, summary: ['Error analyzing'], isImportant: false, category: 'FYI' };
              }
            })
          );
          
          setEmails(analyzedEmails.filter((e) => e.isImportant));
          setAnalyzing(false);
        }
      } catch (error) {
        console.error("Failed to fetch emails:", error);
        setLoading(false);
        setAnalyzing(false);
      }
    }
    
    fetchAndAnalyze();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Good afternoon</h2>
          <p className="text-foreground/60">Here is your AI-curated important digest.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard 
          icon={<Mail className="text-blue-500" size={24} />} 
          label="Emails Scanned" 
          value={loading ? "..." : scannedCount.toString()} 
        />
        <MetricCard 
          icon={<Zap className="text-amber-500" size={24} />} 
          label="Important Found" 
          value={analyzing ? "..." : emails.length.toString()} 
        />
        <MetricCard 
          icon={<CheckCircle2 className="text-green-500" size={24} />} 
          label="Pending Actions" 
          value={analyzing ? "..." : emails.filter(e => e.category === 'Action Required').length.toString()} 
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap size={18} className="text-amber-500" /> Important Digest
          </h3>
          <span className="text-xs font-medium bg-foreground/10 px-2 py-1 rounded text-foreground/70">
            Recent Inbox
          </span>
        </div>
        
        <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center p-12 text-foreground/50 gap-3">
              <Loader2 className="animate-spin" /> Fetching your latest emails...
            </div>
          )}
          
          {!loading && analyzing && emails.length === 0 && (
            <div className="flex items-center justify-center p-12 text-foreground/50 gap-3">
              <Loader2 className="animate-spin text-amber-500" /> AI is analyzing your inbox...
            </div>
          )}
          
          {!loading && !analyzing && emails.length === 0 && (
            <div className="text-center p-12 text-foreground/50 border border-dashed border-border rounded-xl">
              No important emails found. You're all caught up!
            </div>
          )}

          {emails.map(email => (
            <EmailCard key={email.id} email={email} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
      <div className="p-3 bg-foreground/5 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground/60">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
