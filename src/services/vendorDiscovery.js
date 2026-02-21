// Mock vendor database - simulating vendor discovery from multiple sources
const VENDOR_DATABASE = {
  'email': [
    {
      name: 'SendGrid',
      category: 'Email Delivery Service',
      priceRange: '$15-$80/month',
      pricingModel: 'Pay-as-you-go, based on volume',
      features: [
        'SMTP API & Web API',
        'Email analytics & tracking',
        'India region support',
        '99.99% uptime SLA',
        'Real-time webhooks'
      ],
      risks: [
        'Higher costs at scale',
        'Limited free tier (100 emails/day)'
      ],
      evidence: [
        {
          source: 'SendGrid Pricing Page',
          link: 'https://sendgrid.com/pricing/',
          quote: 'Starting at $15/month for 40,000 emails. India region available.'
        },
        {
          source: 'SendGrid Documentation',
          link: 'https://docs.sendgrid.com/',
          quote: '99.99% uptime SLA with real-time analytics and webhook support.'
        }
      ]
    },
    {
      name: 'Mailgun',
      category: 'Email Delivery Service',
      priceRange: '$35-$80/month',
      pricingModel: 'Tiered pricing based on volume',
      features: [
        'RESTful API',
        'Email validation',
        'India region support',
        'Advanced analytics',
        'Bounce & complaint handling'
      ],
      risks: [
        'More expensive than competitors',
        'Complex setup for beginners'
      ],
      evidence: [
        {
          source: 'Mailgun Pricing',
          link: 'https://www.mailgun.com/pricing/',
          quote: 'Plans start at $35/month. India region supported with dedicated IPs.'
        },
        {
          source: 'Mailgun Features',
          link: 'https://www.mailgun.com/features/',
          quote: 'Advanced email validation and bounce handling included.'
        }
      ]
    },
    {
      name: 'Amazon SES',
      category: 'Email Delivery Service',
      priceRange: '$0.10 per 1,000 emails',
      pricingModel: 'Pay-per-use, very cost-effective',
      features: [
        'AWS integration',
        'India region (Mumbai)',
        'High deliverability',
        'Scalable to millions',
        'SMTP & API access'
      ],
      risks: [
        'Requires AWS account setup',
        'Less user-friendly interface',
        'No built-in analytics dashboard'
      ],
      evidence: [
        {
          source: 'AWS SES Pricing',
          link: 'https://aws.amazon.com/ses/pricing/',
          quote: '$0.10 per 1,000 emails sent. Mumbai region available.'
        },
        {
          source: 'AWS SES Documentation',
          link: 'https://docs.aws.amazon.com/ses/',
          quote: 'Integrates seamlessly with other AWS services.'
        }
      ]
    }
  ],
  'vector database': [
    {
      name: 'Pinecone',
      category: 'Vector Database',
      priceRange: '$70-$145/month',
      pricingModel: 'Subscription-based with free tier',
      features: [
        'Managed service',
        'Easy API integration',
        'Real-time updates',
        'Metadata filtering',
        'Free tier available'
      ],
      risks: [
        'Can get expensive at scale',
        'Vendor lock-in',
        'Limited customization'
      ],
      evidence: [
        {
          source: 'Pinecone Pricing',
          link: 'https://www.pinecone.io/pricing/',
          quote: 'Starter plan at $70/month. Free tier includes 1 index.'
        },
        {
          source: 'Pinecone Docs',
          link: 'https://docs.pinecone.io/',
          quote: 'Fully managed vector database with simple API.'
        }
      ]
    },
    {
      name: 'Weaviate',
      category: 'Vector Database',
      priceRange: 'Free (self-hosted) or $25+/month',
      pricingModel: 'Open source or cloud managed',
      features: [
        'Open source option',
        'GraphQL API',
        'Multi-tenant support',
        'Hybrid search',
        'Self-hostable'
      ],
      risks: [
        'Self-hosting requires DevOps',
        'Smaller community than competitors',
        'Learning curve for GraphQL'
      ],
      evidence: [
        {
          source: 'Weaviate Cloud',
          link: 'https://weaviate.io/pricing',
          quote: 'Cloud plans start at $25/month. Open source version available.'
        },
        {
          source: 'Weaviate Documentation',
          link: 'https://weaviate.io/developers/weaviate',
          quote: 'GraphQL API with hybrid search capabilities.'
        }
      ]
    },
    {
      name: 'Qdrant',
      category: 'Vector Database',
      priceRange: 'Free (self-hosted) or $25+/month',
      pricingModel: 'Open source or cloud',
      features: [
        'Open source',
        'RESTful API',
        'High performance',
        'Payload filtering',
        'Self-hostable'
      ],
      risks: [
        'Self-hosting complexity',
        'Smaller ecosystem',
        'Limited managed options'
      ],
      evidence: [
        {
          source: 'Qdrant Cloud',
          link: 'https://qdrant.tech/pricing/',
          quote: 'Cloud plans from $25/month. Open source version free.'
        },
        {
          source: 'Qdrant Docs',
          link: 'https://qdrant.tech/documentation/',
          quote: 'High-performance vector database with REST API.'
        }
      ]
    }
  ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Match keywords in need to vendor categories
const matchCategory = (need) => {
  const lowerNeed = need.toLowerCase();
  if (lowerNeed.includes('email') || lowerNeed.includes('mail')) {
    return 'email';
  }
  if (lowerNeed.includes('vector') || lowerNeed.includes('embedding')) {
    return 'vector database';
  }
  // Default fallback
  return 'email';
};

// Filter vendors based on requirements
const filterVendorsByRequirements = (vendors, requirements) => {
  return vendors.map(vendor => {
    let matchScore = 0;
    const matchedFeatures = [];

    requirements.forEach(req => {
      const reqLower = req.value.toLowerCase();
      
      // Check budget
      if (req.type === 'budget') {
        // Simple budget matching (could be enhanced)
        if (reqLower.includes('free') || reqLower.includes('low')) {
          if (vendor.priceRange.includes('Free') || vendor.priceRange.includes('$0')) {
            matchScore++;
          }
        }
      }
      
      // Check region
      if (req.type === 'region') {
        if (reqLower.includes('india') || reqLower.includes('asia')) {
          vendor.features.forEach(feature => {
            if (feature.toLowerCase().includes('india') || feature.toLowerCase().includes('region')) {
              matchScore++;
              matchedFeatures.push(feature);
            }
          });
        }
      }
      
      // Check features
      if (req.type === 'feature') {
        vendor.features.forEach(feature => {
          if (feature.toLowerCase().includes(reqLower) || reqLower.includes(feature.toLowerCase())) {
            matchScore++;
            if (!matchedFeatures.includes(feature)) {
              matchedFeatures.push(feature);
            }
          }
        });
      }
    });

    return {
      ...vendor,
      matchScore,
      matchedFeatures: matchedFeatures.length > 0 ? matchedFeatures : vendor.features.slice(0, 3)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

export const discoverVendors = async (need, requirements) => {
  // Simulate API call delay
  await delay(2000);

  const category = matchCategory(need);
  let vendors = VENDOR_DATABASE[category] || VENDOR_DATABASE['email'];

  // Filter and rank vendors based on requirements
  vendors = filterVendorsByRequirements(vendors, requirements);

  // Return top 3 vendors (or all if less than 3)
  return vendors.slice(0, 3).map(({ matchScore, matchedFeatures, ...vendor }) => ({
    ...vendor,
    features: matchedFeatures.length > 0 ? matchedFeatures : vendor.features
  }));
};
