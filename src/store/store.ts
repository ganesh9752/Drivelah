import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppStore, AppState } from './types'

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
  persist(
    (set) => ({
      ...initialState,
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      addDevice: (device) =>
        set((state) => ({
          devices: [...state.devices, device],
        })),
      updateDevice: (id, updates) =>
        set((state) => ({
          devices: state.devices.map((device) =>
            device.id === id ? { ...device, ...updates } : device
          ),
        })),
      removeDevice: (id) =>
        set((state) => ({
          devices: state.devices.filter((device) => device.id !== id),
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setIsFrozen: (frozen) => set({ isFrozen: frozen }),
      toggleAddon: (id) =>
        set((state) => ({
          addons: state.addons.map((addon) =>
            addon.id === id
              ? { ...addon, selected: !addon.selected }
              : { ...addon, selected: false } // Radio buttons: only one can be selected
          ),
        })),
      setCardDetails: (details) => set({ cardDetails: details }),
      reset: () => set(initialState),
    }),
    {
      name: STORAGE_KEY,
      merge: (persistedState: any, currentState: AppState) => {
        // Ensure addons array always has all required addons
        const requiredAddonIds = ['byo-secondary-gps', 'byo-lockbox', 'between-trip-insurance']
        const mergedAddons = requiredAddonIds.map((id) => {
          const existing = persistedState?.addons?.find((a: any) => a.id === id)
          if (existing) {
            return existing
          }
          // If addon doesn't exist in persisted state, use from initial state
          return currentState.addons.find((a) => a.id === id) || currentState.addons[0]
        })
        
        return {
          ...currentState,
          ...persistedState,
          addons: mergedAddons,
        }
      },
    }
  )
)

