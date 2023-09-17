import React, { useState, useEffect } from "react";
import { useRoomWithUserQuery } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";
import { withUrqlClient } from "next-urql";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import Image from "next/image";

// interface profileProps {

// }

const Profile: React.FC<{}> = ({}) => {
  const [userRooms] = useRoomWithUserQuery();
  const [links, setLinks] = useState([]);
  useEffect(() => {
    if (!userRooms.fetching) {
      if (userRooms.data.roomWithUser) {
        setLinks(userRooms.data.roomWithUser.links);
      }
    }
  }, [userRooms]);
  console.log(links);
  return (
    <Layout>
      <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
        <Heading mb={-10} color={"#FC766A"}>
          Active rooms
        </Heading>
        <Flex flexDir={"column"}>
          {links ? (
            links.map((link) => {
              return (
                <Text as={"a"} href={link}>
                  {link}
                </Text>
              );
            })
          ) : (
            <Flex justifyContent={"center"}>
              <Image
                src={"/images/room.svg"}
                alt="/"
                width={650}
                height={650}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createURQLClient)(Profile);
