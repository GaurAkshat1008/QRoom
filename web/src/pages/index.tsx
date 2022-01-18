import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Wrapper } from "../components/wrapper";
import {
  useEnterExistingRoomMutation,
  useEnterRoomMutation,
  useMeQuery,
  useNewRoomMutation,
} from "../generated/graphql";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { InputField } from "../components/inputField";
import { Layout } from "../components/layout";

const Index: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const [, newRoom] = useNewRoomMutation();
  const [, enterRoom] = useEnterRoomMutation();
  const [, openRoom] = useEnterExistingRoomMutation()
  let body = null;
  if (fetching) {
  } else if (!data.me) {
    body = <Flex>pls Login</Flex>;
  } else {
    body = (
      <Flex justifyContent={"center"} alignItems={"center"} p={4}>
        <Box flex={1} m={10} borderRight={"1px solid white"} p={10}>
          <Box mb={10} justifyContent={'center'} display={'flex'} fontSize={'xl'}>
        Create new room
          </Box>
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={async (values) => {
              const token = v4().slice(0, 12);
              const newName = `${values.name}-${token}`;
              values.name = newName;
              const { error } = await newRoom({ input: values, token: token });
              if (!error) {
                const url = await enterRoom({
                  name: newName,
                  password: values.password,
                  token: token,
                });
                router.push(`${url.data.enterRoom}`);
                // console.log(url.data.enterRoom);
              }
            }}
          >
            {(props) => (
              <Form>
                <InputField
                  name="name"
                  placeholder="Name of the room"
                  label="Name"
                />
                <InputField
                  name="password"
                  placeholder="Enter a password for the room"
                  label="Password"
                  type={"password"}
                />
                <Flex
                  color={"blue.100"}
                  cursor={"pointer"}
                  mt={2}
                  direction={"column"}
                >
                  <Button
                    mt={5}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    w={"max-content"}
                    justifyContent={"center"}
                    alignSelf={"end"}
                  >
                    Create Room
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
        <Box flex={1} margin={2}>
        <Box mb={10} justifyContent={'center'} display={'flex'} fontSize={'xl'}>
        Join existing room
          </Box>
          <Formik
            initialValues={{ roomName: "" }}
            onSubmit={async (values) => {
              const url = await openRoom({name:values.roomName})
              router.push(`${url.data.enterExistingRoom}`)
              console.log(url.data.enterExistingRoom);
              
            }}
          >
            {(props) => (
              <Form>
                <InputField
                  name="roomName"
                  placeholder="Name of the room"
                  label="Name"
                />
                <Flex
                  color={"blue.100"}
                  cursor={"pointer"}
                  mt={2}
                  direction={"column"}
                >
                  <Button
                    mt={5}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    w={"max-content"}
                    justifyContent={"center"}
                    alignSelf={"end"}
                  >
                    Join Room
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    );
  }
  return (
    <>
      <Layout variant="regular">{body}</Layout>
    </>
  );
};

export default Index;
