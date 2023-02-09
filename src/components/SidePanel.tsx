import { Box } from "@chakra-ui/react";
import { DirectionsForm } from "./DirectionsForm";
import { Logo } from "./Logo";
import { ArrivalTimes } from "./ArrivalTimes";

export function SidePanel() {
    return (
        <Box w='max-content' h='100vh' bg='white' borderRight='1px' borderColor='gray.300' dropShadow='2xl' p='20px'>
            <Logo />
            <DirectionsForm />
            <ArrivalTimes/>
        </Box>
    )
}