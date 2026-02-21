## Tech Stack

- React 18
- JavaScript (ES6+)
- Tailwind CSS
- Local Storage for persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start and wait for 3 seconds then it will run on your browser
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your need in the input field (e.g., "email delivery service for India")
2. Add at least 5 requirements:
   - Budget (e.g., "under $100/month")
   - Region (e.g., "India")
   - Must-have features (e.g., "API access", "analytics", "webhooks")
3. Click "Build Shortlist"
4. Review the comparison table with vendor details
5. View your saved shortlists in the history section

## Project Structure

```
src/
├── components/
│   ├── NeedInput.js          # Form for entering needs and requirements
│   ├── ComparisonTable.js    # Vendor comparison table
│   └── ShortlistHistory.js   # View saved shortlists
├── services/
│   ├── vendorDiscovery.js    # Mock vendor discovery service
│   └── storage.js            # Local storage utilities
├── App.js                    # Main application component
├── index.js                  # Entry point
└── index.css                 # Tailwind CSS imports
```

## How It Works

The app uses a mock vendor discovery service that:
- Matches your need to vendor categories
- Filters vendors based on your requirements
- Ranks vendors by match score
- Returns top 3 vendors with detailed comparison data

All shortlists are saved to browser local storage and limited to the last 5 entries.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
