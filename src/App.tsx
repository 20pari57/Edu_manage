import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { NegotiationPanel } from './components/NegotiationPanel';
import { Role } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, LayoutDashboard } from 'lucide-react';
import { Button } from './components/UI';

export default function App() {
  const [role, setRole] = useState<Role>('admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState<'dashboard' | 'negotiation'>('dashboard');
  const [activeTab, setActiveTab] = useState('overview');

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setActiveTab('overview');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex font-sans">
      <Sidebar 
        role={role} 
        setRole={handleRoleChange} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Navbar />

        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {/* View Switcher */}
          <div className="flex gap-4 mb-8">
            <Button 
              variant={view === 'dashboard' ? 'primary' : 'ghost'} 
              onClick={() => setView('dashboard')}
              className="gap-2"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Button>
            <Button 
              variant={view === 'negotiation' ? 'primary' : 'ghost'} 
              onClick={() => setView('negotiation')}
              className="gap-2"
            >
              <MessageSquare size={18} /> Live Negotiation
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${role}-${view}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {view === 'negotiation' ? (
                <NegotiationPanel />
              ) : (
                <>
                  {role === 'admin' && <AdminDashboard activeTab={activeTab} onTabChange={handleTabChange} onViewChange={setView} />}
                  {role === 'teacher' && <TeacherDashboard activeTab={activeTab} onTabChange={handleTabChange} onViewChange={setView} />}
                  {role === 'student' && <StudentDashboard activeTab={activeTab} onTabChange={handleTabChange} />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button for AI Help */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <MessageSquare size={24} />
        <span className="absolute right-16 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask AI Assistant
        </span>
      </button>
    </div>
  );
}
