import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface messageBoxProps {
  variant?: "me" | "they";
  author?: any;
}

export const MessageBox: React.FC<messageBoxProps> = ({
  author,
  children,
  variant = "they",
}) => {
  return (
    <Flex
    flexDir={'column'}
    minWidth={'10%'}
      width={"max-content"}
      maxWidth={"50%"}
      padding={2}
      m={4}
      ml={variant === "me" ? "auto" : "4"}
      border={"2px solid transparent"}
      borderRadius={10}
      backgroundColor={variant === "me" ? "twitter.500" : "facebook.900"}
    >
        <Box ml={'auto'} fontSize={10} color={'white'} fontWeight={'700'}>~{author}</Box>
      <Box>{children}</Box>
    </Flex>
  );
};
