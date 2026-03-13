export { HEADING_CLASSES, HEADING_DISPLAY_CLASSES, HEADING_CTA_CLASSES, BODY_CLASSES, LABEL_CLASSES } from './typography';

// Animation constants
export const ANIMATION = {
  SCROLL_OFFSET: -80,
  SCROLL_DURATION: 1.5,
  ARROW_DURATION: 3,
};

export const BRANDS = [
  'Apple',
  'Google',
  'JPMorgan Chase',
  'Samsung',
  'American Express',
  'Citigroup',
  'Comcast',
  'Rocket Mortgage',
  'Expedia',
  'Publicis',
  'Wayfair',
  'Navan',
  'Peloton',
  'Hertz',
];

export const NAV_ITEMS = [
  { label: 'Approach', id: 'approach' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Call', id: 'contact' }
];

export const VALUE_PROPS = [
  {
    title: 'Execution, Not Just Advice',
    description: 'A growth leader in the trenches with your team — not a consultant who disappears after a deck. We own the outcome, set clear KPIs upfront, and keep things moving.'
  },
  {
    title: 'One Team, Full Ownership',
    description: 'Every specialist your business needs — media, creative, analytics, operations — managed under one roof. We manage the work. You get the results.'
  },
  {
    title: 'Built on AI, Driven by Results',
    description: 'AI powers our research, strategy, and reporting. We test fast, scale what works, and make sure each dollar brings something in return.'
  }
];

export const CAPABILITIES = [
  {
    title: 'Business Planning',
    description: 'Every engagement starts with your commercial objectives, market realities, and unit economics. We keep marketing in lockstep with your P&L.',
  },
  {
    title: 'Marketing Strategy',
    description: 'We distill brand, audience, and lifecycle into a clear roadmap: who to reach, what to say, and why it converts.',
  },
  {
    title: 'Media Activation',
    description: 'We activate the channels that drive your growth—Meta, Google, Microsoft, email, and beyond—with measurement design built in from day one.',
  },
  {
    title: 'Campaign Execution',
    description: 'Creative and content that convert attention into revenue while reinforcing brand equity. Continuous performance monitoring and optimization keep every dollar working.',
  },
];

export const PARTNER_OUTCOMES = [
  {
    id: 1,
    metric: "+30% revenue in 90 days.",
    detail: "Luxury beauty retailer breaks growth plateau after strategy, media, and operations transformation.",
    client: "Exclusive Beauty Club"
  },
  {
    id: 2,
    metric: "Zero to market in eight weeks.",
    detail: "The first AI-powered marketplace for Salesforce talent.",
    client: "Cloud Club"
  }
];

export const TIERS = [
  {
    id: 'management',
    title: 'Management',
    subtitle: 'Growth Leadership',
    description: 'For leaders who need full operational ownership. We become your growth department. We build and lead your marketing team, manage agencies and vendors, and own performance.',
  },
  {
    id: 'strategy',
    title: 'Strategy',
    subtitle: 'Go-to-Market Design',
    description: 'For teams ready to build the playbook. We audit what you have, model your growth, and deliver a roadmap you can execute with confidence.',
  },
  {
    id: 'advisory',
    title: 'Advisory',
    subtitle: 'Strategic Guidance',
    description: "For founders who need an executive thought partner. We help you make the right decisions on hiring, vendors, and positioning. With honest guidance on what's working and what isn't.",
  },
];

export const COMPARISON_DATA = [
  {
    category: 'Advisory',
    features: [
      {
        name: 'Strategic Coaching',
        description: 'Strategy calls to review progress, troubleshoot issues, and align on priorities.',
        advisory: true,
        strategy: true,
        management: true
      },
      {
        name: 'Vendor Guidance',
        description: 'Recommendations on vendor selection, negotiation, and management.',
        advisory: true,
        strategy: true,
        management: true
      },
      {
        name: 'Tool Recommendations',
        description: 'Guidance on martech stack, analytics tools, and operational software.',
        advisory: true,
        strategy: true,
        management: true
      },
    ]
  },
  {
    category: 'Strategy',
    features: [
      {
        name: 'Go-to-Market Plan',
        description: 'Positioning, channel selection, and GTM audit to identify gaps and opportunities.',
        advisory: false,
        strategy: true,
        management: true
      },
      {
        name: 'Growth Modeling',
        description: 'Forecasting, budget modeling, and unit economics review.',
        advisory: false,
        strategy: true,
        management: true
      },
      {
        name: 'Project Roadmap',
        description: '30/60/90-day action plans with milestone tracking.',
        advisory: false,
        strategy: true,
        management: true
      },
      {
        name: 'Marketing SOPs',
        description: 'Repeatable processes for marketing ops and campaigns.',
        advisory: false,
        strategy: true,
        management: true
      },
      {
        name: 'Quarterly Business Reviews',
        description: 'Data-driven analysis with strategic recommendations.',
        advisory: false,
        strategy: true,
        management: true
      },
    ]
  },
  {
    category: 'Execution',
    features: [
      {
        name: 'Performance Monitoring',
        description: 'KPI tracking, metrics review, and reporting.',
        advisory: false,
        strategy: false,
        management: true
      },
      {
        name: 'Execution Oversight',
        description: 'Day-to-day campaign management and quality control.',
        advisory: false,
        strategy: false,
        management: true
      },
      {
        name: 'Team Orchestration',
        description: 'Aligning internal and external teams on timelines and deliverables.',
        advisory: false,
        strategy: false,
        management: true
      },
      {
        name: 'Talent Sourcing',
        description: 'Recruiting and onboarding contractors, agencies, and freelancers.',
        advisory: false,
        strategy: false,
        management: true
      },
      {
        name: 'Vendor Oversight',
        description: 'Managing vendor relationships, contracts, and deliverable quality.',
        advisory: false,
        strategy: false,
        management: true
      },
      {
        name: 'Creative & Campaign Briefs',
        description: 'Strategic direction and success metrics for designers and copywriters.',
        advisory: false,
        strategy: false,
        management: true
      },
    ]
  }
];

// Flattened features list (no category groupings)
export const FEATURES = COMPARISON_DATA.flatMap(section => section.features);

// Mobile-specific tier data — unique features only (no repetition)
export const MOBILE_TIERS = [
  {
    id: 'management',
    title: 'Management',
    subtitle: 'Growth Leadership',
    description: 'For leaders who need full operational ownership. We become your growth department. We build and lead your marketing team, manage agencies and vendors, and own performance.',
    includesText: 'Everything in Strategy, plus:',
    features: [
      'Performance Monitoring',
      'Execution Oversight',
      'Team Orchestration',
      'Talent Sourcing',
      'Vendor Oversight',
      'Creative & Campaign Briefs',
    ],
  },
  {
    id: 'strategy',
    title: 'Strategy',
    subtitle: 'Go-to-Market Design',
    description: 'For teams ready to build the playbook. We audit what you have, model your growth, and deliver a roadmap you can execute with confidence.',
    includesText: 'Everything in Advisory, plus:',
    features: [
      'Go-to-Market Plan',
      'Growth Modeling',
      'Project Roadmap',
      'Marketing SOPs',
      'Quarterly Business Reviews',
    ],
  },
  {
    id: 'advisory',
    title: 'Advisory',
    subtitle: 'Strategic Guidance',
    description: "For founders who need an executive thought partner. We help you make the right decisions on hiring, vendors, and positioning. With honest guidance on what's working and what isn't.",
    includesText: 'Includes:',
    features: [
      'Strategic Coaching',
      'Vendor Guidance',
      'Tool Recommendations',
    ],
  },
];

// End of file
