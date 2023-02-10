import { Flex, useMediaQuery } from '@chakra-ui/react'
import { useEffect } from 'react'
import RailMap from './components/RailMap'
import { SidePanel } from './components/SidePanel'
import { useStore } from './store'

function App() {
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
  const mapView = useStore((state) => state.mapView)
  const setMapView = useStore((state) => state.setMapView)

  useEffect(() => {
    isLargerThan600 ?  setMapView(true) : setMapView(false)
  }, [isLargerThan600])

  return (
    <Flex alignItems='flex-start'
     flexDir={isLargerThan600 ? 'row' : 'column'}
     >
      <SidePanel />
      {mapView ? <RailMap/> : null}
    </Flex>
  )
}

export default App

