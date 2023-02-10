import { ChakraProvider } from "@chakra-ui/react"
import { generateRandomTimes } from './utils'
import { useStore } from './store'
import App from "./App"


export function AllProviders() {
  // simulate getting new times from Marta API
    const randomTimes = generateRandomTimes()
    const setArrivalTimes = useStore((state) => state.setArrivalTimes)
    setArrivalTimes(randomTimes)

    return(
      <ChakraProvider>
          <App/>
      </ChakraProvider>
    )
}
