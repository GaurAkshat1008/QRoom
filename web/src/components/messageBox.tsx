import { Box } from '@chakra-ui/react';
import React from 'react'



interface messageBoxProps {
  variant?: 'me' | 'they'
}

export const MessageBox: React.FC<messageBoxProps> = ({children, variant="they"}) => {
    return (
        <Box
            width={'max-content'}
            maxWidth={'50%'}
            padding={2}
            m={4}
            ml={variant === 'me' ? 'auto' : '4'}
            border={'2px solid white'}
            borderRadius={10}
            backgroundColor={'blue.600'}
        >
            {children}
        </Box>
    );
}