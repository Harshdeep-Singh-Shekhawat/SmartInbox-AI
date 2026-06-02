import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Settings, User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-1">Settings</h2>
          <p className="text-foreground/60">Manage your account preferences and app configurations.</p>
        </header>

        <div className="glass-panel p-6 rounded-2xl max-w-3xl space-y-8">
          
          <section>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2">
              <User size={18} /> Account
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Connected Google Account</p>
                  <p className="text-sm text-foreground/60">Manage your connected Gmail inbox</p>
                </div>
                <button className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 rounded-lg text-sm font-medium transition-colors">
                  Manage
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2">
              <Bell size={18} /> Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Daily Digest</p>
                  <p className="text-sm text-foreground/60">Receive a daily summary of all important emails</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-primary-foreground rounded-full absolute right-1 top-1 shadow-sm"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Urgent Push Alerts</p>
                  <p className="text-sm text-foreground/60">Get notified immediately for "Action Required" emails</p>
                </div>
                <div className="w-12 h-6 bg-foreground/20 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-background rounded-full absolute left-1 top-1 shadow-sm"></div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b border-border pb-2">
              <Shield size={18} /> Privacy & AI
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">On-the-fly Processing</p>
                  <p className="text-sm text-foreground/60">Ensure emails are never permanently stored in the database</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-primary-foreground rounded-full absolute right-1 top-1 shadow-sm"></div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="font-medium text-red-500">Delete Account & Data</p>
                  <p className="text-sm text-foreground/60">Permanently revoke access and delete all custom rules</p>
                </div>
                <button className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors">
                  Delete Data
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
