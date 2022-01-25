import { Box, Flex } from '@chakra-ui/react';
import React from 'react'

interface carBoxProps {
  modelY: string,
  carType:string,
  carModel:string
  km:string,
  desc:string
}

export const CarBox: React.FC<carBoxProps> = ({modelY, carType, carModel, km, desc}) => {
    return (
      <Flex h={'20em'} bgGradient={'linear(to-l, #7928CA, #FF0080)'} p={4} flexDirection={'column'}>
        <Box>
        {carType}
        </Box>
        <Box>
        {carModel}
        </Box>
        <Box>
        {modelY}
        </Box>
        <Box>
        {km}
        </Box>
        <Box>
        {`${desc.slice(0,50)}...`}
        </Box>
      </Flex>
    );
}