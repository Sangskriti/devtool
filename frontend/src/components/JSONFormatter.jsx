import React, { useState } from 'react';

export default function JSONFormatter({ darkMode }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  

  const handleFormat = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/format-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.formatted);
        
      } else {
        setError(data.error);
        setOutput('');
      }
    } catch (e) {
      setError('Server error: ' + e.message);
      setOutput('');
    }
  };

  

  return (
    <div className="space-y-4">
      <textarea
        rows="6"
        className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : ''}`}
        placeholder="Enter raw JSON..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className={`px-4 py-2 rounded ${darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
        onClick={handleFormat}
      >
        Format JSON
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {output && (
        <div className={`relative p-2 rounded break-all whitespace-pre-wrap ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
          <pre>{output}</pre>
          {/* <button
            
            className="absolute top-2 right-2 text-sm bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            
          </button> */}
        </div>
      )}
    </div>
  );
}
