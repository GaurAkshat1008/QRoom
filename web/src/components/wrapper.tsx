import { Box, FlexProps } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant =  'small' | 'regular' | 'large'

interface WrapperProps {
    variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }, props:FlexProps) => {
    return (
        <Box
            mt={8}
            w="100%"
            maxW={variant === 'regular'? 'md' : variant==='large' ? 'lg' : 'sm'}
            mx="auto"
            {...props}
            p={[8, 6, 4, 2]}
            >
            {children}
        </Box>
    );
}