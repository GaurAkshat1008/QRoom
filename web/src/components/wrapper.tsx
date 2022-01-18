import { Box } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant =  'small' | 'regular' | 'large'

interface WrapperProps {
    variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
    return (
        <Box
            mt={8}
            w="100%"
            maxW={variant === 'regular'? '800px' : variant==='large' ? '100%' : '400px'}
            mx="auto">
            {children}
        </Box>
    );
}