export const SUBSCRIPTION_PLANS = {
  'just-mates': {
    id: 'just-mates',
    name: 'Just mates',
    price: 'Free',
    features: [
      { label: 'Bring your own GPS', icon: 'info' },
      { label: 'Mileage reporting to be done by you', icon: 'info' },
      { label: 'In-person key handover to guests', icon: 'lock' },
    ],
  },
  'good-mates': {
    id: 'good-mates',
    name: 'Good mates',
    price: '$10/month',
    features: [
      { label: 'Primary GPS included', icon: 'check' },
      { label: 'Automated mileage calculations', icon: 'check' },
      { label: 'In-person key handover to guests', icon: 'lock' },
    ],
  },
  'best-mates': {
    id: 'best-mates',
    name: 'Best mates',
    price: '$30/month',
    features: [
      { label: 'Keyless access technology', icon: 'check' },
      { label: 'Automated mileage calculations', icon: 'check' },
      { label: 'Remote handover to guests', icon: 'lock' },
    ],
  },
} as const

export const STEPS = [
  'Location',
  'About',
  'Features',
  'Rules',
  'Pricing',
  'Promotion',
  'Pictures',
  'Insurance',
  'Subscription',
  'Device',
  'Easy Access',
] as const

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const

