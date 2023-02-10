import { create } from 'zustand'

export interface StationType {
  label: string,
  value: string
}

export interface ArrivalTimesType {
  DESTINATION: string,
  DIRECTION: string,
  EVENT_TIME: string,
  LINE: string,
  NEXT_ARR: string,
  STATION: string,
  TRAIN_ID: string,
  WAITING_SECONDS: string,
  WAITING_TIME: string
}[]

interface StateType {
  startingPoint: StationType,
  destination: StationType,
  arrivalTimes: ArrivalTimesType | null,
  mapView: boolean,
  setStartingPoint: (obj: StationType) => void,
  setDestination: (obj: StationType) => void,
  setArrivalTimes: (array: ArrivalTimesType) => void,
  setMapView: (boolean: boolean) => void
}

export const useStore = create<StateType>((set) => ({
  startingPoint: {value: '', label: ''},
  destination: {value: '', label: ''},
  arrivalTimes: null,
  mapView: true,
  setStartingPoint: (obj) => set(() => ({startingPoint: obj})),
  setDestination: (obj) => set(() => ({destination: obj})),
  setArrivalTimes: (array) => set(() => ({arrivalTimes: array})),
  setMapView: (boolean) => set(() => ({mapView: boolean}))
}))