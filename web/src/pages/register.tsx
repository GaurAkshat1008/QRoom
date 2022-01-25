import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/ErrorMap";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";

const Register: React.FC<{}> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            username: values.username,
            password: values.password,
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
            values.username="", values.password=""
          } else if (response.data?.register.user) {
            //worked
            router.push("/");
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
            <Flex color={"twitter.700"} cursor={"pointer"} direction={"column"}>
              <NextLink href={"/login"}>
                <Box ml={"auto"} mt={2}>
                  Already a User?
                </Box>
              </NextLink>
              <Button
                mt={4}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                color={'white'}
                isLoading={props.isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
