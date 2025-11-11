import React, { useState } from 'react'
import DOMPurify from 'dompurify'

export default function App() {
  const [input, setInput] = useState('')
  const [sanitizedOutput, setSanitizedOutput] = useState('')

  function handleSanitize() {
    // Split by lines, sanitize each line, then join back with newlines
    const lines = input.split('\n')
    const sanitizedLines = lines.map(line => {
      return DOMPurify.sanitize(line, { 
        ALLOWED_TAGS: [], // Strip all HTML tags, keeping only text
        KEEP_CONTENT: true // Keep the text content inside tags
      })
    })
    setSanitizedOutput(sanitizedLines.join('\n'))
  }

  function handleCopy() {
    navigator.clipboard.writeText(sanitizedOutput)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Demunger</h1>

        <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
        <textarea
          className="w-full border rounded p-3 resize-y h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste column data from Google Sheets here..."
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSanitize}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Sanitize
          </button>
        </div>

        <h2 className="mt-6 text-lg font-medium">Sanitized output</h2>
        <textarea
          className="w-full border rounded p-3 resize-y h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          value={sanitizedOutput}
          readOnly
          placeholder="Sanitized output will appear here..."
        />
        
        {sanitizedOutput && (
          <div className="flex justify-end mt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
