import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  FolderKanban, 
  Users, 
  CreditCard, 
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import './index.css';

// Mock Data
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7200 },
  { name: 'Jul', value: 6800 },
  { name: 'Aug', value: 8500 },
  { name: 'Sep', value: 9000 },
  { name: 'Oct', value: 10500 },
  { name: 'Nov', value: 9800 },
  { name: 'Dec', value: 12000 },
];

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Social', value: 100 },
];
// Updated colors matching the new neon/tech vibe
const COLORS = ['#5e6ad2', '#17c964', '#f31260', '#f5a524'];

const activityData = [
  {
    id: 1,
    user: { name: 'Olivia Martin', email: 'olivia.martin@email.com', avatar: 'https://i.pravatar.cc/150?u=olivia' },
    action: 'Upgraded to Pro Plan',
    date: 'Today, 2:45 PM',
    status: 'Completed'
  },
  {
    id: 2,
    user: { name: 'Jackson Lee', email: 'jackson.lee@email.com', avatar: 'https://i.pravatar.cc/150?u=jackson' },
    action: 'Payment failed for Invoice #1023',
    date: 'Today, 11:30 AM',
    status: 'Failed'
  },
  {
    id: 3,
    user: { name: 'Isabella Nguyen', email: 'isabella.n@email.com', avatar: 'https://i.pravatar.cc/150?u=isabella' },
    action: 'Invited 3 team members',
    date: 'Yesterday, 4:15 PM',
    status: 'Completed'
  },
  {
    id: 4,
    user: { name: 'William Kim', email: 'will@company.com', avatar: 'https://i.pravatar.cc/150?u=will' },
    action: 'Requested data export',
    date: 'Yesterday, 1:20 PM',
    status: 'Processing'
  },
  {
    id: 5,
    user: { name: 'Sofia Davis', email: 'sofia.d@email.com', avatar: 'https://i.pravatar.cc/150?u=sofia' },
    action: 'Downgraded to Basic Plan',
    date: 'Oct 23, 2023',
    status: 'Completed'
  }
];

const sparklineData1 = [{ v: 0 }, { v: 10 }, { v: 5 }, { v: 20 }, { v: 15 }, { v: 30 }, { v: 25 }, { v: 40 }];
const sparklineData2 = [{ v: 20 }, { v: 18 }, { v: 25 }, { v: 30 }, { v: 28 }, { v: 35 }, { v: 30 }, { v: 45 }];
const sparklineData3 = [{ v: 10 }, { v: 5 }, { v: 8 }, { v: 4 }, { v: 6 }, { v: 2 }, { v: 3 }, { v: 1 }];
const sparklineData4 = [{ v: 5 }, { v: 8 }, { v: 12 }, { v: 10 }, { v: 18 }, { v: 25 }, { v: 22 }, { v: 30 }];

// Subcomponents
const Sidebar = () => {
  const [active, setActive] = useState('Dashboard');
  const items = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Projects', icon: FolderKanban },
    { name: 'Team', icon: Users },
    { name: 'Billing', icon: CreditCard },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span>Nexus</span>
        </div>
      </div>
      <div className="sidebar-nav">
        {items.map(item => (
          <div 
            key={item.name} 
            className={`nav-item ${active === item.name ? 'active' : ''}`}
            onClick={() => setActive(item.name)}
          >
            <item.icon />
            <span className="nav-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="top-header">
      <div className="search-container">
        <Search className="search-icon" />
        <input type="text" className="search-input" placeholder="Search across your workspace, projects, or settings..." />
      </div>
      <div className="header-actions">
        <div className="action-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </div>
        <img 
          src="https://i.pravatar.cc/150?u=admin" 
          alt="User avatar" 
          className="user-avatar"
        />
      </div>
    </div>
  );
};

const KPICard = ({ title, value, trend, trendValue, icon: Icon, sparklineData, color }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="glass-card kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <Icon className="kpi-icon" />
      </div>
      <div className="kpi-value-row">
        <span className="kpi-value">{value}</span>
        <div className={`kpi-trend ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trendValue}</span>
        </div>
      </div>
      <div className="sparkline-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
             <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="v" 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#gradient-${title.replace(/\s+/g, '')})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-custom-tooltip">
        <div className="chart-custom-tooltip-label">{label} 2023</div>
        <div className="chart-custom-tooltip-value">
          ${payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="glass-card chart-card" style={{ gridColumn: '1 / span 1' }}>
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Revenue Overview</h3>
          <p className="chart-subtitle">Monthly recurring revenue over the past 12 months</p>
        </div>
        <div className="action-btn">
          <MoreHorizontal size={20} />
        </div>
      </div>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5e6ad2" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#5e6ad2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }} 
              tickFormatter={(value) => `$${value/1000}k`}
              dx={-10}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#5e6ad2" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#fff', style: {filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.8))'} }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TrafficChart = () => {
  return (
    <div className="glass-card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Traffic Sources</h3>
          <p className="chart-subtitle">Where visitors come from</p>
        </div>
        <div className="action-btn">
          <MoreHorizontal size={20} />
        </div>
      </div>
      <div className="chart-content" style={{ minHeight: '220px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={trafficData}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {trafficData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderColor: '#222', borderRadius: '8px', border: '1px solid #333' }}
              itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}
              labelStyle={{ display: 'none' }}
              formatter={(value, name) => [value, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
        {trafficData.map((entry, index) => (
           <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#a1a1aa', fontWeight: 500 }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index], boxShadow: `0 0 8px ${COLORS[index]}` }}></div>
             {entry.name}
           </div>
        ))}
      </div>
    </div>
  );
};

const ActivityTable = () => {
  return (
    <div className="glass-card table-card">
      <div className="table-header">
        <h3 className="table-title">Recent Activity</h3>
        <span className="table-action">View history <ChevronRight size={14} style={{marginLeft: 2}}/></span>
      </div>
      <table className="activity-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((row) => (
            <tr key={row.id}>
              <td>
                <div className="user-cell">
                  <img src={row.user.avatar} alt={row.user.name} />
                  <div className="user-cell-info">
                    <span className="user-cell-name">{row.user.name}</span>
                    <span className="user-cell-email">{row.user.email}</span>
                  </div>
                </div>
              </td>
              <td className="action-cell">{row.action}</td>
              <td className="date-cell">{row.date}</td>
              <td>
                <span className={`status-badge status-${row.status.toLowerCase()}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">Welcome back, here's what's happening today.</p>
            </div>
            <div className="date-picker">
              <Calendar size={15} />
              <span>Oct 18 - Nov 18</span>
            </div>
          </div>

          <div className="kpi-grid">
            <KPICard 
              title="Total Revenue" 
              value="$124,563" 
              trend="up" 
              trendValue="12.5%" 
              icon={CreditCard}
              sparklineData={sparklineData1}
              color="#17c964"
            />
            <KPICard 
              title="Active Users" 
              value="45,231" 
              trend="up" 
              trendValue="8.2%" 
              icon={Users}
              sparklineData={sparklineData2}
              color="#5e6ad2"
            />
            <KPICard 
              title="Churn Rate" 
              value="2.4%" 
              trend="down" 
              trendValue="0.8%" 
              icon={BarChart2}
              sparklineData={sparklineData3}
              color="#f5a524"
            />
            <KPICard 
              title="MRR Growth" 
              value="$12,450" 
              trend="up" 
              trendValue="14.2%" 
              icon={BarChart2}
              sparklineData={sparklineData4}
              color="#17c964"
            />
          </div>

          <div className="charts-grid">
            <RevenueChart />
            <TrafficChart />
          </div>

          <ActivityTable />
        </div>
      </div>
    </div>
  );
}

export default App;
