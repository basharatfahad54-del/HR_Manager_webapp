import { useState } from 'react'

const CandidateAssessment = ({ apiBase }) => {
  const [resume, setResume] = useState('')
  const [testResult, setTestResult] = useState('')
  const [scoreResult, setScoreResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateTest = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${apiBase}/assessments/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resume.substring(0, 4000) })  // Limit
      })
      if (!res.ok) throw new Error('Backend error')
      const data = await res.json()
      setTestResult(data.test || 'No test generated')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const scoreCandidate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${apiBase}/assessments/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume })
      })
      if (!res.ok) throw new Error('Scoring failed')
      const data = await res.json()
      setScoreResult(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-[rgb(20,184,166)] to-[rgb(6,182,212)] bg-clip-text text-transparent">
        Candidate Assessment AI
      </h2>
      
      {/* Resume Input */}
      <textarea
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        placeholder="Paste candidate resume or JD here..."
        className="w-full p-6 border-2 border-gray-200 rounded-2xl h-40 focus:border-[rgb(99,102,241)] focus:outline-none resize-vertical shadow-sm"
      />

      {/* Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={generateTest}
          disabled={loading || !resume}
          className={`py-4 px-8 rounded-2xl font-semibold shadow-xl transform transition-all ${
            loading || !resume
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[rgb(99,102,241)] to-purple-600 hover:scale-105 hover:shadow-2xl text-white'
          }`}
        >
          {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-magic mr-2"></i>}
          Generate Test
        </button>
        <button
          onClick={scoreCandidate}
          disabled={loading || !resume}
          className={`py-4 px-8 rounded-2xl font-semibold shadow-xl transform transition-all ${
            loading || !resume
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[rgb(20,184,166)] to-emerald-500 hover:scale-105 hover:shadow-2xl text-white'
          }`}
        >
          {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-calculator mr-2"></i>}
          AI Score
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-6 bg-red-100 border-2 border-red-400 rounded-2xl text-red-800 font-semibold">
          <i className="fas fa-exclamation-triangle mr-2"></i>{error}
        </div>
      )}

      {/* Test Results */}
      {testResult && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-2xl border-2 border-[rgb(6,182,212)]">
          <h3 className="text-2xl font-bold mb-4 text-[rgb(6,182,212)]">Generated Test</h3>
          <div className="space-y-3 prose max-w-none">
            {testResult.split('\n').map((line, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[rgb(20,184,166)]">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Score */}
      {scoreResult && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white p-8 rounded-2xl shadow-2xl mb-4">
            <p className="text-sm opacity-90 mb-2">AI Score</p>
            <p className="text-6xl font-black">{scoreResult.score?.toFixed(0)}%</p>
            <p className="text-xl capitalize">{scoreResult.recommend}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {scoreResult.skills?.map((skill, i) => (
              <span key={i} className="bg-[rgb(99,102,241)] text-white px-4 py-2 rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CandidateAssessment
