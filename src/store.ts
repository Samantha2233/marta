import { create } from 'zustand'

interface State {
  startingPoint: any,
  destination: any,
  arrivalTimes: any,
  setStartingPoint: (obj: any) => void,
  setDestination: (obj: any) => void,
  setArrivalTimes: (array: any) => void
}

export const useStore = create<State>((set) => ({
  startingPoint: {value: '', label: ''},
  destination: {value: '', label: ''},
  arrivalTimes: [],
  setStartingPoint: (obj) => set(() => ({startingPoint: obj})),
  setDestination: (obj) => set(() => ({destination: obj})),
  setArrivalTimes: (array) => set(() => ({arrivalTimes: array}))
}))