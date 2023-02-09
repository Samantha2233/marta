import { ChakraProvider } from "@chakra-ui/react"
import App from "./App"

export function AllProviders() {
    return(
      <ChakraProvider>
          <App/>
      </ChakraProvider>
    )
}
