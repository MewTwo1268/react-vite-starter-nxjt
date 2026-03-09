import { useState, useEffect } from 'react'
import { 
  Home, 
  Globe, 
  RefreshCw, 
  Shield, 
  Puzzle, 
  Paintbrush, 
  Database, 
  Terminal, 
  Settings,
  Bell,
  Search,
  Plus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronRight,
  MoreVertical,
  Filter,
  Download,
  Trash2,
  Edit,
  Power
} from 'lucide-react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  ArcElement
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  ArcElement
)

// ==================== COMPONENTS ====================

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-purple-600/20 text-white border-l-2 border-purple-500' 
        : 'text-gray-400 hover:bg-purple-600/10 hover:text-white'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
      active ? 'bg-purple-600/30' : 'bg-dark-800 group-hover:bg-purple-600/20'
    }`}>
      <Icon size={20} className={active ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400'} />
    </div>
    <span className="flex-1 text-sm font-medium">{label}</span>
    {badge && (
      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
)

const StatCard = ({ title, value, subtitle, trend, trendUp, icon: Icon, color = 'purple', alert }) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />
    
    <div className="flex items-start justify-between mb-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
        color === 'purple' ? 'bg-purple-600/20 text-purple-400' :
        color === 'green' ? 'bg-green-600/20 text-green-400' :
        color === 'orange' ? 'bg-orange-600/20 text-orange-400' :
        'bg-blue-600/20 text-blue-400'
      }`}>
        <Icon size={28} />
      </div>
      
      {alert ? (
        <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
          Attention
        </span>
      ) : trend && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
          trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          <span className="text-xs font-bold">{trend}</span>
        </div>
      )}
    </div>
    
    <div className="space-y-1">
      <h3 className="text-4xl font-bold text-white tracking-tight font-mono">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
    
    {subtitle && (
      <div className="mt-4 pt-4 border-t border-purple-900/20">
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    )}
  </div>
)

const ActivityItem = ({ icon: Icon, title, subtitle, time, status }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/50 border border-purple-900/10 hover:border-purple-500/20 transition-all">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
      status === 'success' ? 'bg-green-600/20 text-green-400' :
      status === 'error' ? 'bg-red-600/20 text-red-400' :
      status === 'warning' ? 'bg-orange-600/20 text-orange-400' :
      'bg-purple-600/20 text-purple-400'
    }`}>
      <Icon size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-white truncate">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  </div>
)

const QuickAction = ({ icon: Icon, title, subtitle, primary, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group text-left ${
      primary 
        ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-lg hover:shadow-purple-900/30 hover:scale-[1.02]' 
        : 'bg-dark-800 border border-purple-900/20 hover:border-purple-500/30 hover:bg-dark-750'
    }`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
      primary ? 'bg-white/10' : 'bg-purple-600/10 group-hover:bg-purple-600/20'
    }`}>
      <Icon size={24} className={primary ? 'text-white' : 'text-purple-400'} />
    </div>
    <div className="flex-1">
      <h4 className={`font-semibold ${primary ? 'text-white' : 'text-white'}`}>{title}</h4>
      <p className={`text-xs ${primary ? 'text-purple-200' : 'text-gray-500'}`}>{subtitle}</p>
    </div>
    <ChevronRight size={20} className={primary ? 'text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all' : 'text-gray-600 group-hover:text-purple-400'} />
  </button>
)

// ==================== CHARTS ====================

const PerformanceChart = () => {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [120, 115, 145, 180, 165, 140, 125],
        borderColor: '#8b5cf6',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
          return gradient
        },
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Uptime %',
        data: [99.9, 99.9, 99.5, 98.8, 99.2, 99.9, 99.9],
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        align: 'end',
        labels: { 
          color: '#9ca3af',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 }
        } 
      }
    },
    scales: {
      x: { 
        grid: { color: 'rgba(139, 92, 246, 0.05)', drawBorder: false }, 
        ticks: { color: '#6b7280', font: { size: 11 } } 
      },
      y: { 
        grid: { color: 'rgba(139, 92, 246, 0.05)', drawBorder: false }, 
        ticks: { color: '#6b7280', font: { size: 11 } } 
      },
      y1: { 
        position: 'right', 
        grid: { drawOnChartArea: false }, 
        ticks: { color: '#10b981', callback: (value) => value + '%' } 
      }
    }
  }

  return <Line data={data} options={options} />
}

const UpdateDistributionChart = () => {
  const data = {
    labels: ['Core', 'Plugins', 'Themes'],
    datasets: [{
      data: [3, 12, 3],
      backgroundColor: ['#8b5cf6', '#f97316', '#3b82f6'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(19, 19, 31, 0.9)',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1,
        padding: 12
      }
    }
  }

  return <Doughnut data={data} options={options} />
}

// ==================== MAIN APP ====================

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showToast, setShowToast] = useState(null)

  const showNotification = (message, type = 'success') => {
    setShowToast({ message, type })
    setTimeout(() => setShowToast(null), 3000)
  }

  const handleQuickAction = (action) => {
    showNotification(`${action} initiated successfully!`)
  }

  return (
    <div className="flex h-screen bg-dark-950 text-gray-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-l-4 ${
            showToast.type === 'success' ? 'bg-dark-800 border-green-500' : 'bg-dark-800 border-purple-500'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              showToast.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
            }`}>
              {showToast.type === 'success' ? <CheckCircle size={20} /> : <RefreshCw size={20} />}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{showToast.type === 'success' ? 'Success' : 'Info'}</p>
              <p className="text-xs text-gray-400">{showToast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-80 bg-dark-900 border-r border-purple-900/10 flex flex-col">
        <div className="p-6 border-b border-purple-900/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Globe className="text-white" size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white">TabbyPress</h1>
              <p className="text-xs text-purple-400 font-medium uppercase tracking-wider">Control Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest">Overview</div>
          <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Globe} label="All Sites" badge="24" active={activeTab === 'sites'} onClick={() => setActiveTab('sites')} />
          <SidebarItem icon={RefreshCw} label="Mass Updates" badge="8" active={activeTab === 'updates'} onClick={() => setActiveTab('updates')} />
          <SidebarItem icon={Shield} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />

          <div className="px-4 py-2 mt-6 text-xs font-bold text-gray-600 uppercase tracking-widest">Management</div>
          <SidebarItem icon={Puzzle} label="Plugins" active={activeTab === 'plugins'} onClick={() => setActiveTab('plugins')} />
          <SidebarItem icon={Paintbrush} label="Themes" active={activeTab === 'themes'} onClick={() => setActiveTab('themes')} />
          <SidebarItem icon={Database} label="Backups" active={activeTab === 'backups'} onClick={() => setActiveTab('backups')} />

          <div className="px-4 py-2 mt-6 text-xs font-bold text-gray-600 uppercase tracking-widest">System</div>
          <SidebarItem icon={Terminal} label="Activity Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-purple-900/10">
          <div className="rounded-2xl bg-dark-800/50 border border-purple-900/20 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">System Status</span>
            </div>
            <div className="text-sm font-bold text-green-400">All Systems Operational</div>
            <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Last sync: 2 mins ago
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-dark-950 relative">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-purple-900/10 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'sites' && 'Site Management'}
                {activeTab === 'updates' && 'Mass Updates'}
                {activeTab === 'security' && 'Security Center'}
                {activeTab === 'plugins' && 'Plugin Management'}
                {activeTab === 'themes' && 'Theme Management'}
                {activeTab === 'backups' && 'Backup Management'}
                {activeTab === 'logs' && 'Activity Logs'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'dashboard' && 'Real-time monitoring and analytics across your network'}
                {activeTab === 'sites' && 'Manage all your WordPress sites from one place'}
                {activeTab === 'updates' && 'Bulk update WordPress core, plugins, and themes'}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search sites, plugins..." 
                  className="bg-dark-800 border border-purple-900/20 rounded-xl px-5 py-2.5 pl-12 text-sm w-72 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all placeholder-gray-600"
                />
                <Search className="absolute left-4 top-3 text-gray-600" size={18} />
              </div>
              <button className="relative p-3 rounded-xl bg-dark-800 border border-purple-900/20 text-gray-400 hover:text-white hover:border-purple-500/30 transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-dark-800" />
              </button>
              <div className="flex items-center gap-4 pl-6 border-l border-purple-900/20">
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">Admin User</div>
                  <div className="text-xs text-gray-500">Super Administrator</div>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-900/50">
                  AU
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 relative z-10 max-w-[1600px] mx-auto">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Sites Managed" 
                  value="24" 
                  subtitle="22 online, 2 offline"
                  trend="+12%" 
                  trendUp={true} 
                  icon={Globe} 
                  color="purple"
                />
                <StatCard 
                  title="Average Uptime" 
                  value="99.9%" 
                  trend="+4.2%" 
                  trendUp={true} 
                  icon={CheckCircle} 
                  color="green"
                />
                <StatCard 
                  title="Pending Updates" 
                  value="18" 
                  subtitle="8 critical security"
                  icon={AlertTriangle} 
                  color="orange"
                  alert={true}
                />
                <StatCard 
                  title="Security Grade" 
                  value="A+" 
                  trend="+2.1%" 
                  trendUp={true} 
                  icon={Shield} 
                  color="blue"
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Site Performance</h3>
                      <p className="text-sm text-gray-500">Response time & uptime (last 24h)</p>
                    </div>
                    <div className="flex gap-2 bg-dark-800 rounded-xl p-1 border border-purple-900/20">
                      <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white shadow-lg shadow-purple-900/50">24H</button>
                      <button className="px-4 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">7D</button>
                      <button className="px-4 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">30D</button>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <PerformanceChart />
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 p-6 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">Update Distribution</h3>
                    <p className="text-sm text-gray-500">Pending by category</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <div className="h-[200px] w-full">
                      <UpdateDistributionChart />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">18</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Total</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-dark-800/50 border border-purple-900/10">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                        <span className="text-sm text-gray-300">Core Updates</span>
                      </div>
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-dark-800/50 border border-purple-900/10">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
                        <span className="text-sm text-gray-300">Plugins</span>
                      </div>
                      <span className="text-sm font-bold text-white">12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-dark-800/50 border border-purple-900/10">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                        <span className="text-sm text-gray-300">Themes</span>
                      </div>
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Recent Activity</h3>
                      <p className="text-sm text-gray-500">Latest actions across your network</p>
                    </div>
                    <button className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 group">
                      View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <ActivityItem 
                      icon={CheckCircle} 
                      title="Backup completed successfully" 
                      subtitle="ecommerce-store.com" 
                      time="5 mins ago" 
                      status="success" 
                    />
                    <ActivityItem 
                      icon={RefreshCw} 
                      title="Plugin updated automatically" 
                      subtitle="Yoast SEO 21.7 → 21.8 on company-blog.com" 
                      time="1 hour ago" 
                      status="info" 
                    />
                    <ActivityItem 
                      icon={Shield} 
                      title="Security scan completed" 
                      subtitle="All sites verified - no threats found" 
                      time="3 hours ago" 
                      status="success" 
                    />
                    <ActivityItem 
                      icon={XCircle} 
                      title="Update failed - retry scheduled" 
                      subtitle="Connection timeout on client-portal.net" 
                      time="5 hours ago" 
                      status="error" 
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <QuickAction 
                      icon={RefreshCw} 
                      title="Mass Update" 
                      subtitle="Update all sites instantly" 
                      primary={true}
                      onClick={() => handleQuickAction('Mass Update')}
                    />
                    <QuickAction 
                      icon={Shield} 
                      title="Security Scan" 
                      subtitle="Check vulnerabilities"
                      onClick={() => handleQuickAction('Security Scan')}
                    />
                    <QuickAction 
                      icon={Database} 
                      title="Global Backup" 
                      subtitle="Backup all sites now"
                      onClick={() => handleQuickAction('Global Backup')}
                    />
                    <QuickAction 
                      icon={Power} 
                      title="Clear Cache" 
                      subtitle="Purge all caches"
                      onClick={() => handleQuickAction('Cache Clear')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SITES VIEW */}
          {activeTab === 'sites' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> Add Site
                  </button>
                  <button className="px-6 py-3 bg-dark-800 border border-purple-900/30 rounded-xl text-sm font-semibold text-gray-300 hover:border-purple-500/50 hover:text-white transition-all flex items-center gap-2">
                    <Download size={18} /> Import CSV
                  </button>
                </div>
                <div className="flex gap-3">
                  <select className="bg-dark-800 border border-purple-900/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 text-gray-300">
                    <option>All Status</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-dark-800/80 border-b border-purple-900/20">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="w-4 h-4 rounded border-purple-900/30 bg-dark-700 text-purple-600 focus:ring-purple-500" />
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Site</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">WP Version</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Updates</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/10">
                    {[
                      { name: 'ecommerce-store.com', group: 'E-commerce', status: 'online', version: '6.4.2', updates: 3 },
                      { name: 'company-blog.com', group: 'Blog', status: 'online', version: '6.4.1', updates: 1 },
                      { name: 'client-portal.net', group: 'Corporate', status: 'maintenance', version: '6.3.2', updates: 5 },
                      { name: 'tech-startup.io', group: 'Corporate', status: 'offline', version: '6.2.1', updates: 8 },
                    ].map((site, i) => (
                      <tr key={i} className="hover:bg-dark-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-purple-900/30 bg-dark-700 text-purple-600 focus:ring-purple-500" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-dark-700 border border-purple-900/20 flex items-center justify-center">
                              <Globe className="text-purple-400" size={20} />
                            </div>
                            <div>
                              <div className="font-semibold text-white">{site.name}</div>
                              <div className="text-xs text-gray-500">{site.group}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
                            site.status === 'online' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            site.status === 'offline' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          }`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse ${
                              site.status === 'online' ? 'bg-green-400' :
                              site.status === 'offline' ? 'bg-red-400' :
                              'bg-orange-400'
                            }`} />
                            {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={site.updates > 0 ? 'text-orange-400' : 'text-gray-400'}>
                            {site.version}
                            {site.updates > 0 && (
                              <span className="ml-2 text-[10px] bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                                {site.updates} behind
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold ${site.updates > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                            {site.updates > 0 ? `${site.updates} pending` : 'Up to date'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-purple-600/20 rounded-lg text-purple-400 transition-colors" title="Update">
                              <RefreshCw size={18} />
                            </button>
                            <button className="p-2 hover:bg-purple-600/20 rounded-lg text-purple-400 transition-colors" title="Backup">
                              <Download size={18} />
                            </button>
                            <button className="p-2 hover:bg-purple-600/20 rounded-lg text-purple-400 transition-colors" title="Edit">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 hover:bg-red-600/20 rounded-lg text-red-400 transition-colors" title="Delete">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder Views */}
          {['updates', 'security', 'plugins', 'themes', 'backups', 'logs', 'settings'].includes(activeTab) && (
            <div className="flex items-center justify-center h-[60vh] animate-fade-in">
              <div className="text-center">
                <div className="w-24 h-24 rounded-3xl bg-purple-600/10 flex items-center justify-center mx-auto mb-6">
                  {activeTab === 'updates' && <RefreshCw className="text-purple-400" size={48} />}
                  {activeTab === 'security' && <Shield className="text-purple-400" size={48} />}
                  {activeTab === 'plugins' && <Puzzle className="text-purple-400" size={48} />}
                  {activeTab === 'themes' && <Paintbrush className="text-purple-400" size={48} />}
                  {activeTab === 'backups' && <Database className="text-purple-400" size={48} />}
                  {activeTab === 'logs' && <Terminal className="text-purple-400" size={48} />}
                  {activeTab === 'settings' && <Settings className="text-purple-400" size={48} />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h3>
                <p className="text-gray-500">This module is coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
