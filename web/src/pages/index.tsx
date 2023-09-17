import { Heading, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import React from "react";
import { CreateJoinRoom } from "../components/CreateJoinRoom";
import { Layout } from "../components/layout";
import {
  useMeQuery, useMyRoomQuery
} from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";

const Index: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [myRoom] = useMyRoomQuery();
  console.log(myRoom.data);

  let body = null;
  if (fetching) {
  } else if (!data.me) {
    body = (
      <VStack
        as={"a"}
        href="/login"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading mb={-100} color={"#FC766A"}>
          Please Login First
        </Heading>
        <Image src={"/images/auth.svg"} alt="/" width={675} height={675} />
      </VStack>
    );
  } else {
    body = <CreateJoinRoom />;
  }
  return (
    <>
      <Layout variant="regular">{body}</Layout>
    </>
  );
};

export default withUrqlClient(createURQLClient)(Index);
