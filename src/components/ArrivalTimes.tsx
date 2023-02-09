import { useEffect, useState } from "react";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useStore } from '../store'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function ArrivalTimes() {
    const [filteredTimes, setFilteredTimes] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const startingPoint = useStore((state) => state.startingPoint)
    const arrivalTimes = useStore((state) => state.arrivalTimes)
    dayjs.extend(relativeTime);

    useEffect(() => {
        if(startingPoint.value) {
            let times = getArrivalTimes()
            setFilteredTimes(times)
        } else {
            setFilteredTimes([])
        }
        // Simulate an API fetch
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
          }, 700);
          return () => clearTimeout(timer);
    }, [startingPoint.value, refresh])

    const getArrivalTimes = () => {
        const trainsArriving = arrivalTimes.filter(train => train.STATION === startingPoint.value && dayjs(train['NEXT_ARR']).isAfter(dayjs(), 'minute'))
        const orderedArrivals = trainsArriving.sort((a,b) => a['WAITING_TIME'] - b['WAITING_TIME'] ) 
        // On refresh, get current countdown for each train arriving
        orderedArrivals.forEach((arrival) => {
            const now = dayjs()
            const arr = dayjs(arrival['NEXT_ARR'])
            const difference = now.diff(arr, 'minutes')
            arrival['COUNTDOWN'] = Math.abs(difference) 
        })
        return orderedArrivals
    }

    return (
        <VStack pt='35px' alignItems='space-between' >
            {filteredTimes.length ? <Text fontWeight='700'>Arriving in...</Text> : null}
            <Text pb='18px'>{startingPoint.label}</Text>
            <Divider />
            {filteredTimes?.map((arrival, idx) => {
                const eventTime = arrival['WAITING_TIME'] === '0' ? 'Arriving' : dayjs(arrival['NEXT_ARR']).format('h:mm A')
                return (
                    <HStack key={idx}  justifyContent='space-between' pt={6} alignItems='center'>
                        <HStack>
                            <Box w='15px' h='15px' borderRadius='10px' bgColor={arrival['LINE']}></Box>
                            <Text marginLeft={0}>{arrival['DIRECTION']}</Text>
                        </HStack>
                        <Text>{arrival['COUNTDOWN']} min </Text>
                        <Text>{eventTime}</Text>
                    </HStack>
                )
            })}
            {startingPoint.value && filteredTimes.length === 0 ? <Text pt='20px' color='grey'>No arrivals. Please try selecting another Starting Point.</Text> : null}
            {startingPoint.value ? <Button mt='35px !important' onClick={() => setRefresh(!refresh)} isLoading={loading}>Refresh</Button> : null}
        </VStack>
    )
}