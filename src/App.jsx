import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function App() {
  const [input, setInput] = useState('');
  const [sanitizedOutput, setSanitizedOutput] = useState('');

  function handleSanitize() {
    // Split by lines, sanitize each line, then join back with newlines
    const lines = input.split('\n');
    const sanitizedLines = lines.map(line => {
      // First, replace < and > with HTML entities
      let cleaned = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      // Then use DOMPurify to sanitize with allowed tags
      cleaned = DOMPurify.sanitize(cleaned, { 
        ALLOWED_TAGS: ['u', 'p', 'i', 'strong', 'em', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'li', 'ul', 'ol', 'span'],
        KEEP_CONTENT: true // Keep the text content inside tags
      });
      
      // Finally, replace HTML entities back to < and >
      cleaned = cleaned.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      return cleaned;
    });
    setSanitizedOutput(sanitizedLines.join('\n'));
  }

  function handleCopy() {
    navigator.clipboard.writeText(sanitizedOutput);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-6xl mx-auto bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-6">Demunger</h1>

        <h2 className="mt-6 text-lg font-medium">Input</h2>
        <p className="text-xs text-gray-500 mb-2">
          Allowed HTML tags: &lt;u&gt;, &lt;p&gt;, &lt;i&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, &lt;h1-h6&gt;, &lt;a&gt;, &lt;li&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;span&gt;
        </p>
        <textarea
          className="w-full border rounded p-4 resize-y h-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="w-full border rounded p-4 resize-y h-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
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
  );
}
