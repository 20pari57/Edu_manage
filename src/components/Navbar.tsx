import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../mock/data';
import { Badge } from './UI';

export const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 glass sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-md relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search system, users, or logs..."
          className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl glass-hover text-zinc-400 hover:text-white relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0a0a0c]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 glass rounded-2xl overflow-hidden shadow-2xl z-50"
              >
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-bold">Notifications</h3>
                  <button className="text-xs text-indigo-400 hover:underline">Mark all read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">{n.title}</p>
                        <span className="text-[10px] text-zinc-500">{n.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{n.message}</p>
                      <div className="mt-2">
                        <Badge variant={n.type as any}>{n.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full p-3 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                  View all activity
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-[1px] bg-white/5 mx-2" />

        <button className="flex items-center gap-3 p-1.5 rounded-xl glass-hover group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            DK
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold leading-none">Dhruv Kumar</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Super Admin</p>
          </div>
          <ChevronDown size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
};
