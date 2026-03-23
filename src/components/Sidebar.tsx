import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  GraduationCap, 
  BookOpen,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { Role } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  role: Role;
  setRole: (role: Role) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ role, setRole, isOpen, setIsOpen, activeTab, onTabChange }: SidebarProps) => {
  const adminLinks = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Users, label: 'User Management', id: 'users' },
    { icon: ShieldCheck, label: 'System Security', id: 'security' },
    { icon: MessageSquare, label: 'Negotiations', id: 'negotiations' },
  ];

  const teacherLinks = [
    { icon: LayoutDashboard, label: 'Teacher Hub', id: 'overview' },
    { icon: Calendar, label: 'My Schedule', id: 'schedule' },
    { icon: MessageSquare, label: 'AI Negotiations', id: 'negotiations' },
    { icon: Users, label: 'My Classes', id: 'classes' },
  ];

  const studentLinks = [
    { icon: LayoutDashboard, label: 'Student Portal', id: 'overview' },
    { icon: BookOpen, label: 'Subjects', id: 'subjects' },
    { icon: Calendar, label: 'Timetable', id: 'timetable' },
    { icon: GraduationCap, label: 'Credits', id: 'credits' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-xl text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className={cn(
          "fixed top-0 left-0 h-full w-64 glass z-40 flex flex-col transition-all duration-300 lg:translate-x-0",
          !isOpen && "lg:w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-white" size={24} />
          </div>
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-xl tracking-tight"
            >
              AI NEXUS
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onTabChange(link.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                activeTab === link.id 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
              )}
            >
              <link.icon size={20} />
              {isOpen && <span>{link.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          {isOpen && (
            <div className="px-4 py-2">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Switch Role</p>
              <div className="flex gap-2">
                {(['admin', 'teacher', 'student'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all",
                      role === r ? "bg-white/10 text-white" : "text-zinc-600 hover:text-zinc-400"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all">
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};
