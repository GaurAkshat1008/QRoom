import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Custom404: React.FC<{}> = ({}) => {
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#121212"}
      h={"100vh"}
      as={'a'}
      href={'/'}
    >
      <Flex borderRadius={"2xl"} overflow={"hidden"}>
        <Image src="/images/gandalf.jpg" width={500} height={500} />
      </Flex>
      <Flex
        flexDir={"column"}
        color={"#EDEDED"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={'xl'}
      >
        <h1>404 - You stepped on wrong branch</h1>
        <h2>Uh Oh, Gandalf is blocking the way!</h2>
        <h2>
          maybe you have a typo in the url? Or you meant to go to a different
        </h2>
        <h2>location? Like...Hobbiton.</h2>
      </Flex>
    </Flex>
  );
};

export default Custom404;
