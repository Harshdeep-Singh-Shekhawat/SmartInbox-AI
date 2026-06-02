"use client";

import React from 'react';
import { LayoutDashboard, Filter, Settings, Inbox, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border h-screen sticky top-0 flex flex-col p-4 glass-panel z-10 hidden md:flex">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="bg-primary p-2 rounded-lg text-primary-foreground">
          <Inbox size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">SmartInbox AI</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        <NavItem href="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={pathname === '/'} />
        <NavItem href="/rules" icon={<Filter size={18} />} label="Filter Rules" active={pathname === '/rules'} />
        <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" active={pathname === '/settings'} />
      </nav>
      
      <div className="mt-auto pt-4 border-t border-border">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
