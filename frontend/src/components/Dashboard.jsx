import { useState, useEffect } from 'react'

const Dashboard = ({ apiBase = 'http://localhost:8000/api/v1' }) => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${apiBase}/hr/analytics`)
        if (res.ok) {
          const data = await res.json()
          setAnalytics(data)
        }
      } catch (err) {
        console.error('Error fetching analytics:', err)
      }
      setLoading(false)
    }
    fetchAnalytics()
  }, [apiBase])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Overview</h2>
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="metric-up p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-all">
          <p className="text-sm opacity-90">Total Candidates</p>
          <p className="text-3xl font-bold mt-2">{analytics?.total_candidates || 0}</p>
          <p className="text-sm flex items-center mt-1"><i className="fas fa-arrow-up text-xs mr-1"></i>+12%</p>
          <i className="fas fa-users absolute top-4 right-4 opacity-75 text-2xl"></i>
        </div>
        <div className="bg-gradient-to-r from-[var(--secondary)] to-purple-600 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-all">
          <p className="text-sm opacity-90">Ready for Hire</p>
          <p className="text-3xl font-bold mt-2">{analytics?.hires_ready || 0}</p>
          <p className="text-sm flex items-center mt-1"><i className="fas fa-arrow-up text-xs mr-1"></i>+5%</p>
          <i className="fas fa-user-plus absolute top-4 right-4 opacity-75 text-2xl"></i>
        </div>
        <div className="metric-down p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-all">
          <p className="text-sm opacity-90">Avg Score</p>
          <p className="text-3xl font-bold mt-2">{analytics?.avg_score?.toFixed(1) || 0}%</p>
          <p className="text-sm flex items-center mt-1"><i className="fas fa-arrow-up text-xs mr-1"></i>+3pt</p>
          <i className="fas fa-chart-line absolute top-4 right-4 opacity-75 text-2xl"></i>
        </div>
        <div className="bg-gradient-to-r from-[var(--accent)] to-cyan-500 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-all">
          <p className="text-sm opacity-90">System Status</p>
          <p className="text-3xl font-bold mt-2">{loading ? '...' : '✓'}</p>
          <p className="text-sm flex items-center mt-1"><i className="fas fa-check text-xs mr-1"></i>Active</p>
          <i className="fas fa-server absolute top-4 right-4 opacity-75 text-2xl"></i>
        </div>
      </div>
      {/* Placeholder Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-xl grid md:grid-cols-2 gap-6">
        <div className="h-96 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
          Performance Trends Chart
        </div>
        <div className="h-96 bg-gradient-to-br from-[var(--secondary)] to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
          Candidate Pipeline
        </div>
      </div>
    </div>
  )
}

export default Dashboard
