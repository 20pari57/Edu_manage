import { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Trophy,
  Target,
  Plus,
  Check
} from 'lucide-react';
import { Card, Badge, Button } from './UI';
import { MOCK_STUDENT_METRICS, MOCK_SCHEDULE } from '../mock/data';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const AVAILABLE_SUBJECTS = [
  { id: 'ml', name: 'Machine Learning', credits: 4 },
  { id: 'cs', name: 'Cybersecurity', credits: 3 },
  { id: 'bt', name: 'Blockchain Tech', credits: 4 },
  { id: 'ai', name: 'AI Ethics', credits: 2 },
];

export const StudentDashboard = ({ activeTab = 'overview', onTabChange }: { activeTab?: string, onTabChange?: (tab: string) => void }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const toggleSubject = (id: string) => {
    if (isConfirmed) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (selectedIds.length === 0) return;
    setIsConfirmed(true);
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const baseCredits = 48;
  const addedCredits = selectedIds.reduce((acc, id) => {
    const sub = AVAILABLE_SUBJECTS.find(s => s.id === id);
    return acc + (sub?.credits || 0);
  }, 0);
  
  const totalCredits = baseCredits + addedCredits;
  const progressPercentage = (totalCredits / 120) * 100;

  const showOverview = activeTab === 'overview';
  const showSubjects = activeTab === 'subjects' || showOverview;
  const showTimetable = activeTab === 'timetable' || showOverview;
  const showCredits = activeTab === 'credits' || showOverview;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            {activeTab === 'subjects' ? 'Subject Selection' : 
             activeTab === 'timetable' ? 'My Timetable' : 
             activeTab === 'credits' ? 'Credit Progress' : 'Welcome back, Dhruv!'}
          </h1>
          <p className="text-zinc-500 mt-1">
            {activeTab === 'subjects' ? 'Select your electives for the upcoming semester.' : 
             activeTab === 'timetable' ? 'Your daily schedule and room allocations.' : 
             activeTab === 'credits' ? 'Track your graduation requirements.' : 
             `You have ${MOCK_SCHEDULE.length} classes today.`}
          </p>
        </div>
        {!showOverview && (
          <Button variant="outline" onClick={() => onTabChange?.('overview')} className="gap-2">
            Back to Dashboard
          </Button>
        )}
      </div>

      {/* Stats - Only show on overview or credits */}
      {(showOverview || activeTab === 'credits') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_STUDENT_METRICS.map((metric, i) => {
            const isCredits = metric.label.includes('Credits');
            if (activeTab === 'credits' && !isCredits) return null;
            
            const displayValue = isCredits ? `${totalCredits}/120` : metric.value;
            const displayProgress = isCredits ? progressPercentage : 70;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={activeTab === 'credits' ? 'lg:col-span-2' : ''}
              >
                <Card className="glass-hover group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{metric.label}</span>
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      {metric.label.includes('Credits') ? <GraduationCap size={16} /> : 
                       metric.label.includes('GPA') ? <Trophy size={16} /> : <Target size={16} />}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold">{displayValue}</h3>
                  <div className="mt-3 w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${displayProgress}%` }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetable */}
        {showTimetable && (
          <Card className={cn(activeTab === 'timetable' ? 'lg:col-span-3' : 'lg:col-span-2')}>
            <h3 className="font-bold text-lg mb-6">Today's Timetable</h3>
            <div className="space-y-4 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/5" />
              
              {MOCK_SCHEDULE.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 relative"
                >
                  <div className="w-12 h-12 rounded-full glass shrink-0 flex items-center justify-center z-10 border-2 border-[#0a0a0c]">
                    <Clock size={18} className="text-indigo-400" />
                  </div>
                  <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold">{item.subject}</h4>
                        <Badge variant={item.status === 'active' ? 'success' : 'warning'}>{item.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1"><Clock size={14} /> {item.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {item.room}</span>
                        <span className="flex items-center gap-1 font-semibold text-zinc-400">{item.teacher}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="hidden sm:flex">Join Class</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Sidebar: Subjects & Progress */}
        {(showSubjects || showCredits) && (
          <div className={cn("space-y-6", activeTab !== 'overview' && "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0")}>
            {showSubjects && (
              <Card className={activeTab === 'subjects' ? 'md:col-span-1' : ''}>
                <h3 className="font-bold mb-4">Subject Selection</h3>
                <p className="text-xs text-zinc-500 mb-6">Registration for Spring 2026 is now open. Select your electives.</p>
                <div className="space-y-3">
                  {AVAILABLE_SUBJECTS.map((subject) => (
                    <button 
                      key={subject.id} 
                      onClick={() => toggleSubject(subject.id)}
                      disabled={isConfirmed}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border transition-all",
                        selectedIds.includes(subject.id) 
                          ? "bg-indigo-600/10 border-indigo-500/50 text-indigo-100" 
                          : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10"
                      )}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium">{subject.name}</p>
                        <p className="text-[10px] opacity-50">{subject.credits} Credits</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                        selectedIds.includes(subject.id) 
                          ? "bg-indigo-600 border-indigo-500" 
                          : "border-zinc-700"
                      )}>
                        {selectedIds.includes(subject.id) && <Check size={12} className="text-white" />}
                      </div>
                    </button>
                  ))}
                  <Button 
                    className="w-full mt-4 gap-2" 
                    onClick={handleConfirm}
                    disabled={selectedIds.length === 0 || isConfirmed}
                  >
                    {isConfirmed ? (
                      <>
                        <Check size={18} /> Confirmed
                      </>
                    ) : (
                      <>
                        <Plus size={18} /> Confirm Selection
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}

            {showCredits && (
              <Card className={cn("bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none", activeTab === 'credits' && 'md:col-span-1')}>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 size={24} />
                  <h3 className="font-bold">Next Milestone</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  Complete <b>{Math.max(0, 4 - addedCredits)} more credits</b> to unlock the Advanced AI Specialization track.
                </p>
                <div className="mt-6 p-3 rounded-xl bg-white/10 backdrop-blur-md">
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                    <span>Progress</span>
                    <span>{Math.min(100, Math.round(progressPercentage))}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, progressPercentage)}%` }}
                      className="h-full bg-white" 
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
