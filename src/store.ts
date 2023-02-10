import { create } from 'zustand'

interface State {
  startingPoint: any,
  destination: any,
  arrivalTimes: any,
  mapView: boolean,
  setStartingPoint: (obj: any) => void,
  setDestination: (obj: any) => void,
  setArrivalTimes: (array: any) => void,
  setMapView: (boolean: boolean) => void
}

export const useStore = create<State>((set) => ({
  startingPoint: {value: '', label: ''},
  destination: {value: '', label: ''},
  arrivalTimes: [],
  mapView: true,
  setStartingPoint: (obj) => set(() => ({startingPoint: obj})),
  setDestination: (obj) => set(() => ({destination: obj})),
  setArrivalTimes: (array) => set(() => ({arrivalTimes: array})),
  setMapView: (boolean) => set(() => ({mapView: boolean}))
}))