import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Filter
} from 'lucide-react';
import { Card, Badge, Button } from './UI';
import { MOCK_TEACHER_METRICS, MOCK_SCHEDULE } from '../mock/data';
import { motion } from 'motion/react';

import { cn } from '../lib/utils';

export const TeacherDashboard = ({ activeTab = 'overview', onTabChange, onViewChange }: { activeTab?: string, onTabChange?: (tab: string) => void, onViewChange?: (view: 'dashboard' | 'negotiation') => void }) => {
  const [scheduleTab, setScheduleTab] = useState('upcoming');

  const showOverview = activeTab === 'overview';
  const showSchedule = activeTab === 'schedule' || showOverview;
  const showNegotiations = activeTab === 'negotiations' || showOverview;
  const showClasses = activeTab === 'classes' || showOverview;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            {showOverview ? 'Teacher Hub' : 
             activeTab === 'schedule' ? 'My Schedule' : 
             activeTab === 'negotiations' ? 'AI Negotiations' : 'My Classes'}
          </h1>
          <p className="text-zinc-500 mt-1">
            {showOverview ? 'Manage your classes, students, and AI-assisted scheduling.' : 
             activeTab === 'schedule' ? 'View and manage your upcoming teaching sessions.' : 
             activeTab === 'negotiations' ? 'Review automated scheduling adjustments.' : 'Manage your assigned student groups.'}
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'negotiations' && (
            <Button variant="primary" className="gap-2" onClick={() => onViewChange?.('negotiation')}>
              Join Live Session
            </Button>
          )}
          <Button className="gap-2">
            <Plus size={18} /> New Class
          </Button>
        </div>
      </div>

      {/* Metrics - Show on overview or specific tabs */}
      {(showOverview || activeTab === 'classes') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TEACHER_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-hover border-l-4 border-l-indigo-500">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{metric.label}</p>
                <h3 className="text-2xl font-display font-bold">{metric.value}</h3>
                <p className={cn(
                  "text-[10px] font-bold mt-2",
                  metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                )}>
                  {metric.trend === 'up' ? '↑' : '↓'} {Math.abs(metric.change)}% from last week
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        {showSchedule && (
          <Card className={cn(activeTab === 'schedule' ? 'lg:col-span-3' : 'lg:col-span-2')}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button 
                  onClick={() => setScheduleTab('upcoming')}
                  className={cn(
                    "text-sm font-bold pb-2 border-b-2 transition-all",
                    scheduleTab === 'upcoming' ? "border-indigo-500 text-white" : "border-transparent text-zinc-500"
                  )}
                >
                  Upcoming Classes
                </button>
                <button 
                  onClick={() => setScheduleTab('past')}
                  className={cn(
                    "text-sm font-bold pb-2 border-b-2 transition-all",
                    scheduleTab === 'past' ? "border-indigo-500 text-white" : "border-transparent text-zinc-500"
                  )}
                >
                  Past Sessions
                </button>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter size={14} /> Filter
              </Button>
            </div>

            <div className="space-y-4">
              {(scheduleTab === 'upcoming' ? MOCK_SCHEDULE : MOCK_SCHEDULE.slice(0, 2)).map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      item.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : 
                      item.status === 'conflict' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
                    )}>
                      {item.status === 'active' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.subject}</h4>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-500 font-bold uppercase">
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {item.room}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-zinc-400">42 Students</p>
                      <p className="text-[10px] text-zinc-500">Attendance: 94%</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => alert('Rescheduling request sent to AI Agent.')}>Reschedule</Button>
                      <Button variant="secondary" size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Actions & AI Insights */}
        {(showNegotiations || showClasses) && (
          <div className={cn("space-y-6", activeTab !== 'overview' && "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0")}>
            {showNegotiations && (
              <Card className={activeTab === 'negotiations' ? 'md:col-span-1' : ''}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">AI Insights & Negotiations</h3>
                  {activeTab === 'negotiations' && <Badge variant="info">3 Active</Badge>}
                </div>
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-indigo-300 leading-relaxed flex-1">
                        "Students in <b>Neural Networks</b> are struggling with the latest assignment. Consider a review session."
                      </p>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">Review</Button>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-amber-300 leading-relaxed flex-1">
                        "Schedule conflict detected for next Thursday. Agent Alpha is negotiating a swap."
                      </p>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">Details</Button>
                    </div>
                  </div>
                  {activeTab === 'negotiations' && (
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-emerald-300 leading-relaxed flex-1">
                          "Successfully resolved room conflict for Friday. New location: Room 402."
                        </p>
                        <Badge variant="success" className="text-[8px]">Resolved</Badge>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {showClasses && (
              <Card className={activeTab === 'classes' ? 'md:col-span-1' : ''}>
                <h3 className="font-bold mb-4">My Classes & Students</h3>
                {activeTab === 'classes' ? (
                  <div className="space-y-4">
                    {[
                      { name: 'CS101: Intro to AI', students: 45, next: 'Tomorrow, 10:00 AM' },
                      { name: 'CS202: Neural Networks', students: 38, next: 'Today, 2:00 PM' },
                      { name: 'CS303: Ethics in AI', students: 25, next: 'Friday, 11:30 AM' },
                    ].map((cls, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold">{cls.name}</h4>
                          <span className="text-[10px] text-zinc-500">{cls.students} Students</span>
                        </div>
                        <p className="text-[10px] text-indigo-400">Next: {cls.next}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-center">
                      <Users className="mx-auto mb-2 text-indigo-400" size={20} />
                      <span className="text-[10px] font-bold uppercase">Attendance</span>
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-center">
                      <Plus className="mx-auto mb-2 text-indigo-400" size={20} />
                      <span className="text-[10px] font-bold uppercase">Add Task</span>
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-center">
                      <Calendar className="mx-auto mb-2 text-indigo-400" size={20} />
                      <span className="text-[10px] font-bold uppercase">Reschedule</span>
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-center">
                      <AlertCircle className="mx-auto mb-2 text-indigo-400" size={20} />
                      <span className="text-[10px] font-bold uppercase">Report</span>
                    </button>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
