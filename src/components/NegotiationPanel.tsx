import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, History, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from './UI';
import { MOCK_NEGOTIATION_HISTORY } from '../mock/data';
import { cn } from '../lib/utils';

export const NegotiationPanel = () => {
  const [messages, setMessages] = useState(MOCK_NEGOTIATION_HISTORY);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'agent' as const,
        text: "I've analyzed the constraints. Shifting the Physics lab to Tuesday at 2 PM works for 94% of students and resolves the room conflict. Shall I proceed with the update?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
      {/* Sidebar Info */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="h-full">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h3 className="font-bold">Agent Alpha</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Current Context</p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs font-semibold">Room 402 Conflict</p>
                <p className="text-[10px] text-zinc-500 mt-1">Physics vs Chemistry Labs</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Confidence Score</p>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  className="h-full bg-indigo-500"
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 text-right">92% Reliable</p>
            </div>

            <div className="pt-6 border-t border-white/5">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <History size={14} /> View History
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Chat */}
      <Card className="lg:col-span-3 flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold">Live Negotiation Session</span>
          </div>
          <Badge variant="info">Active</Badge>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[80%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                msg.sender === 'agent' ? "bg-indigo-600" : 
                msg.sender === 'system' ? "bg-zinc-800" : "bg-zinc-700"
              )}>
                {msg.sender === 'agent' ? <Bot size={16} /> : 
                 msg.sender === 'system' ? <Info size={16} /> : <User size={16} />}
              </div>
              <div className="space-y-1">
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.sender === 'user' ? "bg-indigo-600 text-white rounded-tr-none" : 
                  msg.sender === 'system' ? "bg-zinc-800/50 text-zinc-400 italic" : "bg-zinc-800 text-zinc-200 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-zinc-500 px-1">{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white/5 border-t border-white/5">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message or constraint..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-indigo-500 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
