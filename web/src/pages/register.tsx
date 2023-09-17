import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorMap";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createURQLClient } from "../utils/createURQLClient";

// interface registerProps {

// }

const Register: React.FC<{}> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Flex p={2} h={"100vh"}>
      <Box flex={0.6} w={"100%"} backgroundColor={"#FCF6F5"}>
        <Box as={"img"} src="/images/spikes.png" w={"100%"} />
      </Box>
      <Box flex={0.4} p={40} borderRight={"1px solid #990011"}>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              username: values.username,
              email: values.email,
              password: values.password,
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              //worked
              router.push("/");
            }
          }}
        >
          {(props) => (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
              />
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
              <Flex color={"red.400"} cursor={"pointer"} direction={"column"}>
                <NextLink href={"/login"}>
                  <Box ml={"auto"} mt={2}>
                    Already a User?
                  </Box>
                </NextLink>
                <Button
                  mt={4}
                  color={"#FCF6F5"}
                  backgroundColor={"#990011"}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default withUrqlClient(createURQLClient)(Register);
