import { useState, useEffect, useRef } from 'react'

const ChatAssistant = ({ apiBase }) => {
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Hi! Ready for HR queries?' }])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    try {
      const res = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', content: data.response || 'AI response from services/ai_chat.py' }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error: Check backend/chat.py' }])
    }
  }

  return (
    <div className="h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 bg-[var(--primary)] text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <i className="fas fa-robot mr-3"></i>AI Chat Assistant
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`max-w-lg p-4 rounded-2xl ${msg.role === 'user' ? 'chat-bubble-user ml-auto' : 'chat-bubble-ai mr-auto bg-gray-200 text-gray-900'}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-6 border-t bg-gray-50">
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-4 border-2 border-gray-200 rounded-l-2xl focus:border-[var(--primary)] focus:outline-none"
            placeholder="Ask about recruitment, analytics..."
          />
          <button onClick={sendMessage} className="bg-[var(--primary)] text-white px-8 py-4 rounded-r-2xl hover:opacity-90 transition">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatAssistant
