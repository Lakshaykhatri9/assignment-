import React from 'react';

function ComparisonTable({ need, requirements, vendors }) {
  if (!vendors || vendors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No vendors found. Please try different requirements.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Vendor Comparison
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Comparing {vendors.length} vendors for: {need}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risks/Limits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Evidence
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {vendor.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {vendor.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {vendor.priceRange}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {vendor.pricingModel}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {vendor.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {vendor.risks.map((risk, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-red-500 mr-2">⚠</span>
                        <span className="text-sm text-gray-700">{risk}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {vendor.evidence.map((evidence, idx) => (
                      <div key={idx} className="text-sm">
                        <a
                          href={evidence.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {evidence.source}
                        </a>
                        <div className="mt-1 text-xs text-gray-600 italic bg-gray-50 p-2 rounded">
                          "{evidence.quote}"
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="text-sm text-gray-600">
          <strong>Requirements matched:</strong> {requirements.map(r => r.value).join(', ')}
        </div>
      </div>
    </div>
  );
}

export default ComparisonTable;
