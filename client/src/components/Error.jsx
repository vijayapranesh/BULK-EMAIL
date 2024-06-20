import React from 'react';

function Error({ message }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-center text-red-500 text-xl font-semibold">Error</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default Error;
