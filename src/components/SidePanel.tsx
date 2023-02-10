import { Box, useMediaQuery } from "@chakra-ui/react";
import { DirectionsForm } from "./DirectionsForm";
import { Logo } from "./Logo";
import { ArrivalTimes } from "./ArrivalTimes";

export function SidePanel() {
    const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')
    const [isSmallerThan600] = useMediaQuery('(max-width: 600px)')

    return (
        <Box 
            w={isSmallerThan600 ? '100%' : 'auto'}
            h={isSmallerThan800 ? 'auto' : '100vh' } 
            borderRight='1px'
            borderColor='gray.300' 
            dropShadow='2xl' 
            p='20px'
        >
            <Logo />
            <DirectionsForm />
            <ArrivalTimes/>
        </Box>
    )
}