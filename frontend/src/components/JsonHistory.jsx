
import React, { useEffect, useState } from 'react';

const JsonHistory = ({ darkMode }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/json-records')
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
      })
      .catch((err) => {
        console.error('Error fetching records:', err);
      });
  }, []);

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
      <h2 className="text-2xl font-bold mb-4">Processed JSON History</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        records.map((record, index) => (
          <div
            key={index}
            className={`mb-4 p-4 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Processed at: {new Date(record.createdAt).toLocaleString()}
            </p>
            <div className="mb-2">
              <strong>Input JSON:</strong>
              <pre
                className={`p-2 rounded overflow-auto text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {record.input}
              </pre>
            </div>
            <div>
              <strong>Formatted JSON:</strong>
              <pre
                className={`p-2 rounded overflow-auto text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {record.formatted}
              </pre>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JsonHistory;
