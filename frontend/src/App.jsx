import { useState } from 'react'
import Dashboard from './components/Dashboard'
import ChatAssistant from './components/ChatAssistant'
import CandidateAssessment from './components/CandidateAssessment'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const API_BASE = 'http://localhost:8000/api/v1'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="fixed md:relative md:w-64 h-screen bg-white shadow-xl p-6 z-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">HR AI Manager</h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left p-3 rounded-xl ${activeTab === 'dashboard' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}>
            <i className="fas fa-tachometer-alt mr-3"></i>Dashboard
          </button>
          <button onClick={() => setActiveTab('chat')} className={`w-full text-left p-3 rounded-xl ${activeTab === 'chat' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}>
            <i className="fas fa-comments mr-3"></i>AI Chat
          </button>
          <button onClick={() => setActiveTab('assessment')} className={`w-full text-left p-3 rounded-xl ${activeTab === 'assessment' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}>
            <i className="fas fa-clipboard-check mr-3"></i>Assessments
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="md:ml-64 p-8">
        {activeTab === 'dashboard' && <Dashboard apiBase={API_BASE} />}
        {activeTab === 'chat' && <ChatAssistant apiBase={API_BASE} />}
        {activeTab === 'assessment' && <CandidateAssessment apiBase={API_BASE} />}
      </main>
    </div>
  )
}

export default App
