
import React, { useState } from 'react';

export default function Base64Tool({ darkMode }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const bytes = new TextEncoder().encode(input);
      const base64 = window.btoa(String.fromCharCode(...bytes));
      setOutput(base64);
      setCopied(false);
    } catch (e) {
      setOutput('Encoding failed: ' + e.message);
    }
  };

  const handleDecode = () => {
    try {
      const binary = window.atob(input);
      const bytes = new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
      setCopied(false);
    } catch (e) {
      setOutput('Invalid Base64 string: ' + e.message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : ''}`}
        rows="6"
        placeholder="Enter text here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2">
        <button onClick={handleEncode} className="bg-blue-500 text-white border px-4 py-2 rounded">
          Encode
        </button>
        <button onClick={handleDecode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Decode
        </button>
      </div>

      <div className={`relative bg-gray-200 p-2 rounded break-all min-h-[3rem] ${darkMode ? 'bg-blue-700 text-black' : ''}`}>
        <div>{output}</div>
        {output && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-sm bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            {copied ? 'Copied!' : '📋 Copy'}
          </button>
        )}
      </div>
    </div>
  );
}
