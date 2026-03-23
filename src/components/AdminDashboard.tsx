import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from './UI';
import { CHART_DATA, MOCK_ADMIN_METRICS, MOCK_SCHEDULE } from '../mock/data';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const AdminDashboard = ({ activeTab = 'overview', onTabChange, onViewChange }: { activeTab?: string, onTabChange?: (tab: string) => void, onViewChange?: (view: 'dashboard' | 'negotiation') => void }) => {
  const showOverview = activeTab === 'overview';
  const showUsers = activeTab === 'users';
  const showSecurity = activeTab === 'security';
  const showNegotiations = activeTab === 'negotiations';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            {showOverview ? 'System Overview' : 
             showUsers ? 'User Management' : 
             showSecurity ? 'System Security' : 'Negotiation Logs'}
          </h1>
          <p className="text-zinc-500 mt-1">
            {showOverview ? 'Real-time monitoring and AI agent coordination.' : 
             showUsers ? 'Manage students, teachers, and administrative staff.' : 
             showSecurity ? 'Monitor system integrity and access logs.' : 'Review automated scheduling negotiations.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export Logs</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {showOverview && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_ADMIN_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-hover">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{metric.label}</span>
                    <div className={
                      metric.trend === 'up' ? 'text-emerald-500' : 
                      metric.trend === 'down' ? 'text-rose-500' : 'text-zinc-500'
                    }>
                      {metric.trend === 'up' ? <TrendingUp size={16} /> : 
                       metric.trend === 'down' ? <TrendingDown size={16} /> : <Minus size={16} />}
                    </div>
                  </div>
                  <div className="flex items-end gap-3">
                    <h3 className="text-3xl font-display font-bold">{metric.value}</h3>
                    <span className={cn(
                      "text-xs font-bold mb-1",
                      metric.trend === 'up' ? 'text-emerald-500' : 
                      metric.trend === 'down' ? 'text-rose-500' : 'text-zinc-500'
                    )}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-lg">Negotiation Activity</h3>
                <select className="bg-zinc-900 border border-white/5 rounded-lg text-xs px-3 py-1.5 focus:outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#17171a', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="negotiations" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorUsers)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-lg mb-6">System Conflicts</h3>
              <div className="space-y-6">
                {MOCK_SCHEDULE.filter(s => s.status === 'conflict').map((conflict) => (
                  <div key={conflict.id} className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="error">Conflict</Badge>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">{conflict.time}</span>
                    </div>
                    <p className="text-sm font-semibold mb-1">{conflict.subject}</p>
                    <p className="text-xs text-zinc-500 mb-3">{conflict.room} • {conflict.teacher}</p>
                    <Button size="sm" variant="danger" className="w-full">Resolve with AI</Button>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-zinc-500 text-center">
                    AI Agent Alpha is currently processing 4 potential resolutions.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {showUsers && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">User Directory</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button size="sm" onClick={() => alert('Add User functionality coming soon!')}>Add User</Button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Dr. Sarah Smith', role: 'Teacher', dept: 'AI Ethics', status: 'Active', email: 's.smith@nexus.edu' },
              { name: 'John Doe', role: 'Student', dept: 'Computer Science', status: 'Active', email: 'j.doe@nexus.edu' },
              { name: 'Prof. Alan Turing', role: 'Teacher', dept: 'Cryptography', status: 'On Leave', email: 'a.turing@nexus.edu' },
              { name: 'Jane Wilson', role: 'Student', dept: 'Data Science', status: 'Active', email: 'j.wilson@nexus.edu' },
              { name: 'Robert Oppenheimer', role: 'Teacher', dept: 'Physics', status: 'Active', email: 'r.opp@nexus.edu' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{user.name}</h4>
                    <p className="text-xs text-zinc-500">{user.email} • {user.dept} • {user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>{user.status}</Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {showSecurity && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Access Logs</h3>
            <div className="space-y-3">
              {[
                { event: 'Admin Login', time: '2 mins ago', user: 'Admin Alpha', ip: '192.168.1.1' },
                { event: 'Rule Update', time: '15 mins ago', user: 'System', ip: 'Internal' },
                { event: 'Failed Login', time: '1 hour ago', user: 'Unknown IP', ip: '45.23.11.9' },
                { event: 'Data Export', time: '3 hours ago', user: 'Admin Beta', ip: '192.168.1.5' },
                { event: 'Password Change', time: '5 hours ago', user: 'John Doe', ip: '10.0.0.12' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-medium">{log.event}</p>
                    <p className="text-xs text-zinc-500">{log.user} • {log.ip}</p>
                  </div>
                  <span className="text-xs text-zinc-600">{log.time}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-lg mb-4">Security Status</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <TrendingUp size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-emerald-400">Firewall Active</h4>
                  <p className="text-xs text-emerald-500/70">All systems operational.</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  <TrendingUp size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-indigo-400">AI Shield Enabled</h4>
                  <p className="text-xs text-indigo-500/70">Monitoring integrity.</p>
                </div>
                <div className="w-12 h-6 bg-indigo-500/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-indigo-500 rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white">
                  <TrendingDown size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-rose-400">2FA Enforcement</h4>
                  <p className="text-xs text-rose-500/70">Required for all staff.</p>
                </div>
                <div className="w-12 h-6 bg-rose-500/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-rose-500 rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {(showOverview || showNegotiations) && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">{showNegotiations ? 'Detailed Negotiation Logs' : 'Recent Schedule Activity'}</h3>
              {showNegotiations && <p className="text-xs text-zinc-500 mt-1">Reviewing automated scheduling adjustments and conflicts.</p>}
            </div>
            <div className="flex gap-2">
              {showNegotiations && (
                <Button variant="primary" size="sm" className="gap-2" onClick={() => onViewChange?.('negotiation')}>
                  Join Live Session
                </Button>
              )}
              <Button variant="ghost" size="sm" className="gap-2">
                View All <ArrowRight size={14} />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Subject</th>
                  <th className="pb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Teacher</th>
                  <th className="pb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Time</th>
                  <th className="pb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Room</th>
                  <th className="pb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_SCHEDULE.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 font-medium text-sm">{item.subject}</td>
                    <td className="py-4 text-sm text-zinc-400">{item.teacher}</td>
                    <td className="py-4 text-sm text-zinc-400">{item.time}</td>
                    <td className="py-4 text-sm text-zinc-400">{item.room}</td>
                    <td className="py-4">
                      <Badge variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
