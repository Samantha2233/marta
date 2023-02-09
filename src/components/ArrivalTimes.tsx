import { useEffect, useState } from "react";
import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { useStore } from '../store'
import { data } from '../data'
import dayjs from "dayjs";

export function ArrivalTimes() {
    const [arrivalTimes, setArrivalTimes] = useState([])
    const startingPoint = useStore((state) => state.startingPoint)
    const destintation = useStore((state) => state.destination)

    useEffect(() => {
        if(startingPoint.value) {
            let times = getArrivalTimes()
            setArrivalTimes(times)
        }
    }, [startingPoint.value])

    const getArrivalTimes = () => {
        const trainsArriving = data.filter(train => train.STATION === startingPoint.value)
        return trainsArriving
    }


    return (
        <Box pt='35px'>
            {/* TD: on load error, loading */}
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
            {startingPoint.value && arrivalTimes.length === 0 ? <Text pt='20px' color='grey'>No arrivals. Please try selecting another Starting Point.</Text> : null}
        </Box>
    )
}