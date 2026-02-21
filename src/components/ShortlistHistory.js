import React from 'react';

function ShortlistHistory({ shortlists, onViewShortlist }) {
  if (shortlists.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No saved shortlists yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Saved Shortlists (Last 5)
      </h2>
      
      <div className="space-y-4">
        {shortlists.map((shortlist) => (
          <div
            key={shortlist.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {shortlist.need}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Requirements:</strong> {shortlist.requirements.length} items
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Vendors Found:</strong> {shortlist.vendors.length}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(shortlist.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => onViewShortlist(shortlist)}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortlistHistory;
