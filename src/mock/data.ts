import { Metric, ScheduleItem, Notification, NegotiationMessage } from '../types';

export const MOCK_ADMIN_METRICS: Metric[] = [
  { label: 'Active Users', value: '1,284', change: 12, trend: 'up' },
  { label: 'System Load', value: '42%', change: -5, trend: 'down' },
  { label: 'Active Negotiations', value: '156', change: 8, trend: 'up' },
  { label: 'Pending Conflicts', value: '12', change: 2, trend: 'up' },
];

export const MOCK_TEACHER_METRICS: Metric[] = [
  { label: 'Classes Today', value: '4', change: 0, trend: 'neutral' },
  { label: 'Students Reached', value: '142', change: 15, trend: 'up' },
  { label: 'Pending Reviews', value: '28', change: -4, trend: 'down' },
  { label: 'Negotiation Success', value: '94%', change: 2, trend: 'up' },
];

export const MOCK_STUDENT_METRICS: Metric[] = [
  { label: 'Credits Earned', value: '48/120', change: 4, trend: 'up' },
  { label: 'GPA', value: '3.8', change: 0.1, trend: 'up' },
  { label: 'Attendance', value: '96%', change: -1, trend: 'down' },
  { label: 'Upcoming Exams', value: '3', change: 1, trend: 'up' },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: '1', subject: 'Advanced AI Ethics', time: '09:00 AM', room: 'Hall A', teacher: 'Dr. Sarah Smith', status: 'active' },
  { id: '2', subject: 'Quantum Computing', time: '11:30 AM', room: 'Lab 4', teacher: 'Prof. James Wilson', status: 'pending' },
  { id: '3', subject: 'Neural Networks', time: '02:00 PM', room: 'Hall C', teacher: 'Dr. Sarah Smith', status: 'conflict' },
  { id: '4', subject: 'Data Visualization', time: '04:30 PM', room: 'Room 202', teacher: 'Ms. Emily Chen', status: 'active' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Schedule Conflict', message: 'Room 302 has a double booking for 2 PM.', type: 'error', time: '2m ago' },
  { id: '2', title: 'New Negotiation', message: 'Agent Alpha is requesting a schedule shift.', type: 'info', time: '15m ago' },
  { id: '3', title: 'System Update', message: 'Dashboard v2.4 successfully deployed.', type: 'success', time: '1h ago' },
];

export const MOCK_NEGOTIATION_HISTORY: NegotiationMessage[] = [
  { id: '1', sender: 'system', text: 'Negotiation session started for Room 402 allocation.', timestamp: '10:00 AM' },
  { id: '2', sender: 'agent', text: 'I propose shifting the Physics lab to Wednesday 10 AM to resolve the conflict with the Chemistry seminar.', timestamp: '10:01 AM' },
  { id: '3', sender: 'user', text: 'Wednesday 10 AM is already occupied by Math 101. Can we try Tuesday afternoon?', timestamp: '10:02 AM' },
  { id: '4', sender: 'agent', text: 'Checking Tuesday availability... Room 402 is free from 2 PM to 4 PM on Tuesday. Shall I finalize this?', timestamp: '10:03 AM' },
];

export const CHART_DATA = [
  { name: 'Mon', users: 400, negotiations: 240, conflicts: 24 },
  { name: 'Tue', users: 300, negotiations: 139, conflicts: 18 },
  { name: 'Wed', users: 200, negotiations: 980, conflicts: 45 },
  { name: 'Thu', users: 278, negotiations: 390, conflicts: 32 },
  { name: 'Fri', users: 189, negotiations: 480, conflicts: 28 },
  { name: 'Sat', users: 239, negotiations: 380, conflicts: 12 },
  { name: 'Sun', users: 349, negotiations: 430, conflicts: 10 },
];
