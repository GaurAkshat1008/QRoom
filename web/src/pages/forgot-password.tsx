import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  return (
    <Flex justifyContent={'center'} alignItems={'center'} h={'80vh'}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
          toast({
            title: "Email Sent",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        }}
      >
        {(props) =>
          complete ? (
            <Box fontSize={'2xl'}>
              If an account with that email exists, we sent you an email
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                  width={"30vw"}
                />
              </Box>
              <Button
                mt={4}
                color={"#FCF6F5"}
                colorScheme="red"
                backgroundColor={"#990011"}
                isLoading={props.isSubmitting}
                type="submit"
                ml={"67%"}
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Flex>
  );
};

export default withUrqlClient(createURQLClient)(ForgotPassword);
