import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LoginButton } from "@/components/LoginButton";
import { Mail } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="glass-panel p-10 rounded-2xl flex flex-col items-center text-center max-w-md">
          <div className="bg-primary/10 p-4 rounded-full text-primary mb-6">
            <Mail size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to SmartInbox AI</h1>
          <p className="text-foreground/60 mb-8">
            Connect your Gmail account to let our AI automatically filter and summarize your most important emails.
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Dashboard />
      </main>
    </div>
  );
}
