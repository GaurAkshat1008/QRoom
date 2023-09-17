import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { MessageSections } from "../../components/messageSections";
import { Wrapper } from "../../components/wrapper";
import {
  useDeleteRoomMutation,
  useMeQuery,
  useMyRoomQuery,
  useRoomQuery,
} from "../../generated/graphql";
import { createURQLClient } from "../../utils/createURQLClient";
import { useEffect, useState } from "react";

const Room: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const toast = useToast();
  const [meData] = useMeQuery();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const [roomData] = useRoomQuery({
    variables: {
      token: token,
    },
  });
  function addToast(msg: string) {
    toast({
      title: msg,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  const [, deleteRoom] = useDeleteRoomMutation();
  let body = null;
  if (!meData) {
    body = (
      <>
        <Heading mb={-100} color={"#FC766A"}>
          Please Login First
        </Heading>
        <Image src={"/images/auth.svg"} alt="/" width={675} height={675} />
      </>
    );
    router.replace("/login");
  } else if (roomData.fetching) {
  } else if (!roomData.fetching && !roomData.data.room) {
    body = (
      <Flex justifyContent={"center"} as={"a"} href="/">
        <Image src={"/images/room.svg"} alt="/" width={650} height={650} />
      </Flex>
    );
    // router.replace('/')
  } else if (!roomData.fetching && roomData) {
    body = (
      <Wrapper variant="large">
        <Flex justifyContent={"space-between"}>
          <Box p={4}>
            <Text>Room Name :{roomData.data.room.name}</Text>
          </Box>
          <Button
            onClick={() => {
              deleteRoom({ id: roomData.data.room.id });
              addToast("Room Deleted.");
              router.push("/");
            }}
            backgroundColor={"red.400"}
          >
            delete room
          </Button>
        </Flex>
        <Box mt={4}>
          <MessageSections token={`${token}`} />
        </Box>
      </Wrapper>
    );
  }

  return (
    <Layout variant="large">
      {loading ? (
        <Flex justifyContent={'center'} h={"75vh"} alignItems={'center'}>
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="#FC766A"
            color="#990011"
            size="xl"
          />
        </Flex>
      ) : (
        body
      )}
    </Layout>
  );
};

Room.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createURQLClient)(Room);
