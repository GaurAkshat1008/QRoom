import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Router from "next/router";
import React from "react";
import {
  Exact,
  useCreateMessageMutation,
  useMeQuery,
  useMessagesByRoomQuery,
  useUserByIdMutation,
} from "../generated/graphql";
import { InputField } from "./inputField";
import { MessageBox } from "./messageBox";

interface token {
  token: string;
}

export const MessageSections: React.FC<token> = ({ token }) => {
  const [meData] = useMeQuery();
  const [, newMessage] = useCreateMessageMutation();
  const [{ data }] = useMessagesByRoomQuery({
    variables: {
      token: token,
    },
  });
  const [, getUser] = useUserByIdMutation();
  let body = null;
  if (!data?.messagesByRoom) {
  } else {
    body = data.messagesByRoom.map((object) => {
      return (
        <MessageBox
          author={object.owner}
          variant={object.owner === meData.data.me.username ? "me" : "they"}
        >
          {object.message}
        </MessageBox>
      );
    });
  }
  return (
    <Flex flexDirection={"column"}>
      <Box flex={"0.9"} backgroundColor={"#FCF6F5"}>
        <Box id="holder" height={"60vh"} p={4} overflowY={'scroll'}>
          {body}
        </Box>
      </Box>
      <Box flex={"0.1"} p={2}>
        <Formik
          initialValues={{ text: "" }}
          onSubmit={async (values, { setErrors }) => {
            if (values.text !== " ") {
              if (!!values.text.trim()) {
                const message = await newMessage({
                  token: token,
                  text: values.text,
                });
              } else {
                setErrors({ text: "Cannot be empty" });
              }
              values.text = "";
            }
          }}
        >
          <Form>
            <Flex
              alignContent={"center"}
              justifyContent={"center"}
              flexDirection={"row"}
            >
              <InputField name="text" placeholder="text" label="" />
              <Button
                type="submit"
                ml={2}
                mt={2}
                p={4}
                color={"#FCF6F5"}
                colorScheme="red"
                backgroundColor={"#990011"}
              >
                Send
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};
