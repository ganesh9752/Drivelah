export type SubscriptionPlan = 'just-mates' | 'good-mates' | 'best-mates'

export interface Device {
  id: string
  deviceType: string
  serialNumber: string
  bringingOwnDevice: boolean
  deviceImage: string | null
}

export interface Addon {
  id: string
  name: string
  price: string
  selected: boolean
}

export interface CardDetails {
  cardNumber: string
  expiryDate: string
  cvc: string
}

export interface AppState {
  selectedPlan: SubscriptionPlan | null
  devices: Device[]
  currentStep: 'subscription' | 'device'
  isFrozen: boolean
  addons: Addon[]
  cardDetails: CardDetails | null
}

export interface AppStore extends AppState {
  setSelectedPlan: (plan: SubscriptionPlan | null) => void
  addDevice: (device: Device) => void
  updateDevice: (id: string, updates: Partial<Device>) => void
  removeDevice: (id: string) => void
  setCurrentStep: (step: 'subscription' | 'device') => void
  setIsFrozen: (frozen: boolean) => void
  toggleAddon: (id: string) => void
  setCardDetails: (details: CardDetails) => void
  reset: () => void
}

