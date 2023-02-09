import { create } from 'zustand'

interface State {
  startingPoint: any,
  destination: any,
  setStartingPoint: (obj: any) => void
  setDestination: (obj: any) => void
}

export const useStore = create<State>((set) => ({
  startingPoint: {value: '', label: ''},
  destination: {value: '', label: ''},
  setStartingPoint: (obj) => set(() => ({startingPoint: obj})),
  setDestination: (obj) => set(() => ({destination: obj}))
}))