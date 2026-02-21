import React, { useState } from 'react';

function NeedInput({ onBuildShortlist, isLoading }) {
  const [need, setNeed] = useState('');
  const [requirements, setRequirements] = useState([
    { id: 1, type: 'budget', value: '', label: 'Budget' },
    { id: 2, type: 'region', value: '', label: 'Region' },
    { id: 3, type: 'feature', value: '', label: 'Must-have Feature 1' },
    { id: 4, type: 'feature', value: '', label: 'Must-have Feature 2' },
    { id: 5, type: 'feature', value: '', label: 'Must-have Feature 3' },
  ]);
  const [requirementCount, setRequirementCount] = useState(5);

  const addRequirement = () => {
    if (requirementCount < 8) {
      const newId = requirementCount + 1;
      setRequirements([
        ...requirements,
        {
          id: newId,
          type: 'feature',
          value: '',
          label: `Must-have Feature ${newId - 2}`
        }
      ]);
      setRequirementCount(requirementCount + 1);
    }
  };

  const removeRequirement = (id) => {
    if (requirements.length > 5) {
      setRequirements(requirements.filter(req => req.id !== id));
      setRequirementCount(requirementCount - 1);
    }
  };

  const updateRequirement = (id, value) => {
    setRequirements(
      requirements.map(req =>
        req.id === id ? { ...req, value } : req
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!need.trim()) {
      alert('Please enter your need');
      return;
    }

    const validRequirements = requirements
      .filter(req => req.value.trim())
      .map(req => ({
        type: req.type,
        value: req.value.trim()
      }));

    if (validRequirements.length < 5) {
      alert('Please enter at least 5 requirements');
      return;
    }

    onBuildShortlist(need.trim(), validRequirements);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Build Your Vendor Shortlist
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="need" className="block text-sm font-medium text-gray-700 mb-2">
            What do you need? *
          </label>
          <input
            type="text"
            id="need"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="e.g., email delivery service for India, vector database for small team"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Describe the product or service you're looking for
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Requirements (Minimum 5, Maximum 8) *
          </label>
          <div className="space-y-3">
            {requirements.map((req) => (
              <div key={req.id} className="flex gap-2">
                <input
                  type="text"
                  value={req.value}
                  onChange={(e) => updateRequirement(req.id, e.target.value)}
                  placeholder={req.label}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {requirements.length > 5 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(req.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {requirementCount < 8 && (
            <button
              type="button"
              onClick={addRequirement}
              className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              + Add Requirement
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Building Shortlist...
            </span>
          ) : (
            'Build Shortlist'
          )}
        </button>
      </form>
    </div>
  );
}

export default NeedInput;
