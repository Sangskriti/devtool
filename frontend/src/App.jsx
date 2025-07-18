import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JSONFormatter from './components/JSONFormatter';
import Base64Tool from './components/Base64Tool';
import JsonHistory from './components/JsonHistory';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('json');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`${darkMode ? 'bg-stone-950 text-white' : 'bg-gray-100 text-black'} min-h-screen p-4`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center w-full">Dev Toolbox</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 dark:text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <Routes>
          {/* Home route with tools */}
          <Route
            path="/"
            element={
              <>
                <div className="flex justify-center space-x-4 mb-4">
                  <button
                    onClick={() => setTab('json')}
                    className={`px-4 py-2 rounded ${tab === 'json' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black border'}`}
                  >
                    JSON Formatter
                  </button>
                  <button
                    onClick={() => setTab('base64')}
                    className={`px-4 py-2 rounded ${tab === 'base64' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black border'}`}
                  >
                    Base64 Encoder/Decoder
                  </button>
                </div>

                <div className="max-w-2xl mx-auto">
                  {tab === 'json' ? <JSONFormatter darkMode={darkMode} /> : <Base64Tool darkMode={darkMode} />}
                </div>
              </>
            }
          />

          {/* Route to view JSON history */}
          <Route path="/history" element={<JsonHistory darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}
