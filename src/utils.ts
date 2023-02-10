import { data } from  './data'
import dayjs from 'dayjs';
import { StationType } from './store';

export const capitalize = (str: string) => {
    let lowerCase = str.toLowerCase()
    const arr = lowerCase.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}

// get all stations from arrivals response
export const getAllStations = () => {
    let stations = [] as string[]
    let stationOptions= [] as StationType[]
    for(let x = 0;  x <data.length;  x++) {
        const current = data[x].STATION
        if(!stations.includes(current)) {
            stations = [...stations,  current]
            stationOptions = [...stationOptions, {
                'value': current, 
                'label': capitalize(current),
            }]
        }
    }   
    return stationOptions
}

export const generateRandomTimes = () => {
    data.forEach((train) => {
        const waitingTime = Math.floor(Math.random() * 60)
        const nextArr = dayjs().add(waitingTime, 'minutes').toISOString()
        train['NEXT_ARR'] = nextArr
        train['WAITING_TIME'] = waitingTime.toString()
    })
    return data
}