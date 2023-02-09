import { useEffect, useState } from "react";
import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { useStore } from '../store'
import { data } from '../data'
import dayjs from "dayjs";

export function ArrivalTimes() {
    const [arrivalTimes, setArrivalTimes] = useState([])
    const startingPoint = useStore((state) => state.startingPoint)
    const destination = useStore((state) => state.destination)

    useEffect(() => {
        if(startingPoint.value) {
            let times = getArrivalTimes()
            setArrivalTimes(times)
        }
    }, [startingPoint.value])

    const getArrivalTimes = () => {
        console.log('data', data)
        const trainsArriving = data.filter(train => train.STATION === startingPoint.value)
        console.log('trainsArriving', trainsArriving)
        // TD: figure out if train is going in correct direction
        return trainsArriving
    }


    return (
        <Box pt='35px'>
            {arrivalTimes.length ? <Text pb='5px' fontWeight='700'>Arriving ...</Text> : null}
            <Text pb='18px'>{startingPoint.label}</Text>

            <Divider />
            
            {arrivalTimes?.map((time, idx) => {
                const eventTime = dayjs(time['EVENT_TIME']).format('h:mm A')
                return (
                    <HStack key={idx}  justifyContent='space-between' pt={6} alignItems='center'>
                        <HStack>
                            <Box w='15px' h='15px' borderRadius='10px' bgColor={time['LINE']}></Box>
                            <Text marginLeft={0}>{time['DIRECTION']}</Text>
                        </HStack>
                        <Text>{time['WAITING_TIME']}</Text>
                        <Text>{eventTime}</Text>
                    </HStack>
                )
            })}

            { arrivalTimes.length === 0 ? <Text pt='20px' color='grey'>No arrivals with current selection. Please try another depatrure station.</Text> : null}
            {/* TD: on load error, loading */}
        </Box>
    )
}