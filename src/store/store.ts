import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppStore, AppState, SubscriptionPlan, Device, CardDetails } from './types'

const STORAGE_KEY = 'diverlah-storage'

const initialState: AppState = {
  selectedPlan: null,
  devices: [],
  currentStep: 'subscription',
  isFrozen: false,
  addons: [
    { id: 'byo-secondary-gps', name: 'BYO secondary GPS', price: '$5/month', selected: false },
    { id: 'byo-lockbox', name: 'BYO lockbox', price: '$10/month', selected: false },
    { id: 'between-trip-insurance', name: 'Between trip insurance', price: 'Coming soon', selected: false },
  ],
  cardDetails: null,
}

export const useAppStore = create<AppStore>()(
  persist<AppStore, [], [], AppState>(
    (set) => ({
      ...initialState,
      setSelectedPlan: (plan: SubscriptionPlan | null) => set({ selectedPlan: plan }),
      addDevice: (device: Device) =>
        set((state) => ({
          devices: [...state.devices, device],
        })),
      updateDevice: (id: string, updates: Partial<Device>) =>
        set((state) => ({
          devices: state.devices.map((device) =>
            device.id === id ? { ...device, ...updates } : device
          ),
        })),
      removeDevice: (id: string) =>
        set((state) => ({
          devices: state.devices.filter((device) => device.id !== id),
        })),
      setCurrentStep: (step: 'subscription' | 'device') => set({ currentStep: step }),
      setIsFrozen: (frozen: boolean) => set({ isFrozen: frozen }),
      toggleAddon: (id: string) =>
        set((state) => ({
          addons: state.addons.map((addon) =>
            addon.id === id
              ? { ...addon, selected: !addon.selected }
              : { ...addon, selected: false } // Radio buttons: only one can be selected
          ),
        })),
      setCardDetails: (details: CardDetails) => set({ cardDetails: details }),
      reset: () => set(initialState),
    }),
    {
      name: STORAGE_KEY,
      merge: (persistedState: unknown, currentState: AppStore): AppStore => {
        // Ensure addons array always has all required addons
        const persisted = persistedState as Partial<AppState>
        const requiredAddonIds = ['byo-secondary-gps', 'byo-lockbox', 'between-trip-insurance']
        const mergedAddons = requiredAddonIds.map((id) => {
          const existing = persisted?.addons?.find((a) => a.id === id)
          if (existing) {
            return existing
          }
          // If addon doesn't exist in persisted state, use from initial state
          return currentState.addons.find((a) => a.id === id) || currentState.addons[0]
        })
        
        // Merge persisted state with current state, preserving all store methods
        return {
          ...currentState,
          ...persisted,
          addons: mergedAddons,
          // Preserve all store methods
          setSelectedPlan: currentState.setSelectedPlan,
          addDevice: currentState.addDevice,
          updateDevice: currentState.updateDevice,
          removeDevice: currentState.removeDevice,
          setCurrentStep: currentState.setCurrentStep,
          setIsFrozen: currentState.setIsFrozen,
          toggleAddon: currentState.toggleAddon,
          setCardDetails: currentState.setCardDetails,
          reset: currentState.reset,
        }
      },
    }
  )
)

