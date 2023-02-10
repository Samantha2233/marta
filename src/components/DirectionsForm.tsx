import { HStack, VStack } from "@chakra-ui/react";
import { FiCircle } from 'react-icons/fi'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { IoLocationSharp } from 'react-icons/io5'
import Select from 'react-select';
import { getAllStations } from "../utils";
import { useStore, StationType } from '../store'

export function DirectionsForm() {
    const stations = getAllStations()
    const startingPoint = useStore((state) => state.startingPoint)
    const destination = useStore((state) => state.destination)
    const setStartingPoint = useStore((state) => state.setStartingPoint)
    const setDestination = useStore((state) => state.setDestination)

    return (
            <HStack justifyContent='space-between'  alignItems='flexStart' w='250px' pt='35px'>
                <VStack justifyContent='space-between' py='12px'>
                    <FiCircle />
                    <HiEllipsisVertical />
                    <IoLocationSharp />
                </VStack>

                <VStack alignItems='stretch' w='88%'>
                    <Select
                        value={startingPoint?.value !== '' && startingPoint }
                        placeholder='Choose Starting Point'
                        name="startingPoint"
                        options={stations}
                        onChange={(e: StationType) => setStartingPoint(e)}                    
                    />
                    <Select
                        value={destination?.value !== '' && destination}
                        placeholder='Choose  Destination'
                        name="destination"
                        options={stations}
                        onChange={(e: StationType) => setDestination(e)}
                    />
                </VStack>
            </HStack>
    )
}