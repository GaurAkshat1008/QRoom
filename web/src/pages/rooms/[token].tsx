import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { MessageSections } from "../../components/messageSections";
import { Wrapper } from "../../components/wrapper";
import {
  useDeleteRoomMutation,
  useMeQuery,
  useRoomQuery,
} from "../../generated/graphql";
import { createURQLClient } from "../../utils/createURQLClient";

const Room: NextPage<{ token: string }> = ({ token }) => {
  // console.log(token);
  const router = useRouter();
  const [meData] = useMeQuery();
  const [roomData] = useRoomQuery({
    variables: {
      token: token,
    },
  });
  const [, deleteRoom] = useDeleteRoomMutation();
  let body = null;
  if (!meData) {
    body = <>pls login</>;
  }
  if (roomData.fetching) {
  }
  if (roomData.data) {
    body = (
      <Wrapper variant="large">
        <Flex justifyContent={"space-between"}>
          <Box border={"1px"} p={4}>
            <Text>Room details</Text>
            <Text>Room Name :{roomData.data.room.name}</Text>
          </Box>
          <Button
            onClick={() => {
              deleteRoom({ id: roomData.data.room.id });
              router.push("/");
            }}
            backgroundColor={"red.400"}
            variant={"ghost"}
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

  return <Layout variant="large">{body}</Layout>;
};

Room.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createURQLClient)(Room);
