import { ChakraProvider } from "@chakra-ui/react"
import { generateRandomTimes } from './utils'
import { useStore, ArrivalTimesType } from './store'
import App from "./App"

export function AllProviders() {
  // simulate getting new times from Marta API
    const randomTimes = generateRandomTimes()
    const setArrivalTimes = useStore((state) => state.setArrivalTimes)
    setArrivalTimes(randomTimes as unknown as ArrivalTimesType)

    return(
      <ChakraProvider>
          <App/>
      </ChakraProvider>
    )
}
