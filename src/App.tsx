import { HStack } from '@chakra-ui/react'
import RailMap from './components/RailMap'
import { SidePanel } from './components/SidePanel'
import { getAllStations } from './utils'

// const instance = axios.create({
//   headers: {
//     "content-type": "application/json",
//     "Access-Control-Allow-Origin": "*"
//   },
// });

// const getNextArrival = async () => {
//   // let url = `http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apiKey=${API_KEY}`;
//   let url = `https://developerservices.itsmarta.com:18096/railrealtimearrivals?apiKey=${process.env.API_KEY}`;
//   try {
//     const response = await instance.get(url);
//     if (response.data) {
//       console.log("response.data", response.data);
//     }
//   } catch (err) {
//     console.log("error", err);
//     return;
//   }
// };

function App() {
  // getNextArrival()
  getAllStations()
  return (
    <HStack alignItems='flex-start'>
      <SidePanel />
      <RailMap />
    </HStack>
  )
}

export default App

