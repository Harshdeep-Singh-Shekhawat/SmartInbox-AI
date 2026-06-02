"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Filter, Plus, Trash2 } from 'lucide-react';

type Rule = { id: string; type: string; value: string; action: string };

const initialRules: Rule[] = [
  { id: '1', type: "Keyword", value: "unstop", action: "Always mark Important" },
  { id: '2', type: "Keyword", value: "job", action: "Always mark Important" },
  { id: '3', type: "Keyword", value: "update", action: "Always mark Important" }
];

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>(initialRules);

  const addRule = () => {
    const value = window.prompt("Enter a keyword or sender email:");
    if (!value) return;
    
    const isSender = value.includes('@');
    const newRule: Rule = {
      id: Date.now().toString(),
      type: isSender ? 'Sender' : 'Keyword',
      value: value,
      action: "Always mark Important"
    };
    
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-1">Filter Rules</h2>
          <p className="text-foreground/60">Customize how the AI categorizes your incoming emails.</p>
        </header>

        <div className="glass-panel p-6 rounded-2xl max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter size={18} /> Active Rules
            </h3>
            <button 
              onClick={addRule}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} /> Add Rule
            </button>
          </div>

          <div className="space-y-4">
            {rules.map(rule => (
              <RuleItem 
                key={rule.id}
                rule={rule}
                onRemove={() => removeRule(rule.id)}
              />
            ))}
            {rules.length === 0 && (
              <div className="text-center p-8 text-foreground/50 border border-dashed border-border rounded-xl">
                No active filter rules.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function RuleItem({ rule, onRemove }: { rule: Rule, onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-border/80 transition-colors bg-foreground/[0.02]">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium bg-foreground/10 px-2 py-0.5 rounded text-foreground/70 uppercase tracking-wider">
            {rule.type}
          </span>
          <span className="text-sm font-semibold">{rule.value}</span>
        </div>
        <p className="text-sm text-foreground/60">
          Action: <span className="font-medium text-foreground/80">{rule.action}</span>
        </p>
      </div>
      <button 
        onClick={onRemove}
        className="p-2 text-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
