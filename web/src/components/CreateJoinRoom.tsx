import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import {
  useEnterExistingRoomMutation,
  useEnterRoomMutation,
  useNewRoomMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/errorMap";
import { InputField } from "./inputField";

export const CreateJoinRoom = () => {
  const router = useRouter();
  const [, newRoom] = useNewRoomMutation();
  const [, enterRoom] = useEnterRoomMutation();
  const [, openRoom] = useEnterExistingRoomMutation();
  return (
    <Flex w={"90%"} ml={28} p={4}>
      <Box flex={0.5} m={10} p={20}>
        <Flex justifyContent={"center"} mb={10} fontSize={"xl"}>
          Create new room
        </Flex>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const token = v4().slice(0, 12);
            const newName = `${values.name}-${token}`;
            values.name = newName;
            if (!!values.name.trim() && !!values.password.trim()) {
              const { error } = await newRoom({ input: values, token: token });
              if (!error) {
                const url = await enterRoom({
                  name: newName,
                  password: values.password,
                  token: token,
                });
                  console.log(url.data)                 
                  router.push(`${url.data.enterRoom.link}`);
              }
            } else {
              setErrors({
                name: "cannot be empty",
                password: "cannot be empty",
              });
              (values.name = ""), (values.password = "");
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
              <Flex mt={2} direction={"column"}>
                <Button
                  mt={5}
                  color={"#FCF6F5"}
                  colorScheme="red"
                  backgroundColor={"#990011"}
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
      <Box flex={0.5} m={10} p={20}>
        <Flex justifyContent={"center"} mb={10} fontSize={"xl"}>
          Join existing room
        </Flex>
        <Formik
          initialValues={{ roomName: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            if (!!values.roomName.trim()) {
              const url = await openRoom({
                name: values.roomName,
                password: values.password,
              });
              if (url.data?.enterExistingRoom.errors) {
                console.log(url.data.enterExistingRoom.errors);
                setErrors(toErrorMap(url.data.enterExistingRoom.errors));
              } else if (url.data.enterExistingRoom.link) {
                // setTimeout(() => {
                  router.push(`${url.data?.enterExistingRoom.link}`);
                // }, 1500);
              }
            } else {
              setErrors({ roomName: "cannot be empty" });
            }
          }}
        >
          {(props) => (
            <Form>
              <InputField
                name="roomName"
                placeholder="Name of the room"
                label="Name"
              />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <Flex mt={2} direction={"column"}>
                <Button
                  mt={5}
                  color={"#FCF6F5"}
                  colorScheme="red"
                  backgroundColor={"#990011"}
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
};
