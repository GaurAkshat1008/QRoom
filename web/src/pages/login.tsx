import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorMap";
import NextLink from "next/link";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { withUrqlClient } from "next-urql";
import { createURQLClient } from "../utils/createURQLClient";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Flex p={2} h={"100vh"}>
      <Box flex={0.4} p={40}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next == "string") {
                router.push(router.query.next);
              } else {
                //worked
                router.push("/");
              }
            }
          }}
        >
          {(props) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type={"password"}
                />
              </Box>

              <Flex
                color={"red.400"}
                cursor={"pointer"}
                mt={2}
                direction={"column"}
              >
                <NextLink href={"/forgot-password"}>
                  <Box ml={"auto"}>Forgot Password?</Box>
                </NextLink>
                <Button
                  mt={4}
                  color={"#FCF6F5"}
                  backgroundColor={"#990011"}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
                <NextLink href={"/register"}>
                  <Box ml={"auto"} mt={2}>
                    Create a new account
                  </Box>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      <Box flex={0.6} w={"100%"} backgroundColor={"#FCF6F5"}></Box>
    </Flex>
  );
};

export default withUrqlClient(createURQLClient)(Login);
