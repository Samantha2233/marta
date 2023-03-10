import { useEffect, useState } from "react";
import { Box, Button, Divider, HStack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useStore } from '../store'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


export function ArrivalTimes() {
    const [filteredTimes, setFilteredTimes] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [refreshVisible, setRefreshVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const startingPoint = useStore((state) => state.startingPoint)
    const arrivalTimes = useStore((state) => state.arrivalTimes)
    const mapView = useStore((state) => state.mapView)
    const setMapView = useStore((state) => state.setMapView)
    const [isSmallerThan600] = useMediaQuery('(max-width: 600px)')

    useEffect(() => {
        // Filter arrivals for selection
        if(startingPoint.value) {
            let times = getArrivalTimes()
            setFilteredTimes(times)
        } else {
            setFilteredTimes([])
        }
        setRefreshVisible(false)
       
        // Display refresh button after one minute
        const refreshVisibleTimer = setTimeout(() => {
            if(startingPoint.value) {
                setRefreshVisible(true)
            }
        }, 61000)

        // Simulate an API refetch
        setLoading(true)
        const loadingTimer = setTimeout(() => {
            setLoading(false)
        }, 700);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(refreshVisibleTimer);
        }
    }, [startingPoint.value, refresh])

    const getArrivalTimes = () => {
        const trainsArriving = Array.isArray(arrivalTimes) && arrivalTimes.filter(train => train.STATION === startingPoint.value && dayjs(train['NEXT_ARR']).isAfter(dayjs(), 'minute'))
        const orderedArrivals = trainsArriving.sort((a,b) => parseInt(a['WAITING_TIME']) - parseInt(b['WAITING_TIME']) ) 
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
            {refreshVisible ? <Button mt='35px !important' onClick={() => setRefresh(!refresh)} isLoading={loading}>Refresh Arrival Times</Button> : null}
            {isSmallerThan600 ? (
                <Button onClick={() =>  setMapView(!mapView)}>
                    {mapView ? 'Hide Map' : 'View Map'}
                </Button>
            ) : null}
        </VStack>
    )
}