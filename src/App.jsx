import React, { useState } from 'react'
import DOMPurify from 'dompurify'

export default function App() {
  const [input, setInput] = useState('')
  const [sanitizedHtml, setSanitizedHtml] = useState('')

  function handleSanitize() {
    // Use DOMPurify to sanitize arbitrary HTML from textarea
    const clean = DOMPurify.sanitize(input, { USE_PROFILES: { html: true } })
    setSanitizedHtml(clean)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Demunger</h1>

        <label className="block text-sm font-medium text-gray-700 mb-2">Input (HTML allowed)</label>
        <textarea
          className="w-full border rounded p-3 resize-y h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type HTML here, e.g. <strong>bold</strong> or <img src=x onerror=alert(1)/>"
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
  <pre className="mt-2 p-4 border rounded bg-gray-50 min-h-[4rem] whitespace-pre-wrap break-words"><code>{sanitizedHtml || '(empty)'}</code></pre>
      </div>
    </div>
  )
}
