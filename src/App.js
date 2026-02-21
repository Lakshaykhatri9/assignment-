import React, { useState, useEffect } from 'react';
import NeedInput from './components/NeedInput';
import ComparisonTable from './components/ComparisonTable';
import ShortlistHistory from './components/ShortlistHistory';
import { discoverVendors } from './services/vendorDiscovery';
import { saveShortlist, getShortlists } from './services/storage';

function App() {
  const [currentShortlist, setCurrentShortlist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedShortlists, setSavedShortlists] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load saved shortlists on mount
    const saved = getShortlists();
    setSavedShortlists(saved);
  }, []);

  const handleBuildShortlist = async (need, requirements) => {
    setIsLoading(true);
    try {
      // Simulate vendor discovery
      const vendors = await discoverVendors(need, requirements);
      
      const shortlist = {
        id: Date.now(),
        need,
        requirements,
        vendors,
        createdAt: new Date().toISOString()
      };

      setCurrentShortlist(shortlist);
      
      // Save to local storage
      saveShortlist(shortlist);
      
      // Reload saved shortlists
      setSavedShortlists(getShortlists());
    } catch (error) {
      console.error('Error building shortlist:', error);
      alert('Error building shortlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewShortlist = (shortlist) => {
    setCurrentShortlist(shortlist);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Vendor Discovery & Shortlist Builder
            </h1>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showHistory ? 'New Search' : 'View History'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHistory ? (
          <ShortlistHistory
            shortlists={savedShortlists}
            onViewShortlist={handleViewShortlist}
          />
        ) : (
          <>
            {!currentShortlist ? (
              <NeedInput
                onBuildShortlist={handleBuildShortlist}
                isLoading={isLoading}
              />
            ) : (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Shortlist for: {currentShortlist.need}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {new Date(currentShortlist.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentShortlist(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    New Search
                  </button>
                </div>
                <ComparisonTable
                  need={currentShortlist.need}
                  requirements={currentShortlist.requirements}
                  vendors={currentShortlist.vendors}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
