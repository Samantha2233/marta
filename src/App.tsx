import { HStack } from '@chakra-ui/react'
import RailMap from './components/RailMap'
import { SidePanel } from './components/SidePanel'
import { useStore } from './store'
import { generateRandomTimes } from './utils'

function App() {
  // simulate getting new times from Marta API
  const randomTimes = generateRandomTimes()
  const setArrivalTimes = useStore((state) => state.setArrivalTimes)
  setArrivalTimes(randomTimes)
  
  return (
    <HStack alignItems='flex-start'>
      <SidePanel />
      <RailMap />
    </HStack>
  )
}

export default App

