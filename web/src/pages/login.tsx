import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import NextLink from 'next/link'
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/ErrorMap";



const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if(typeof router.query.next == 'string'){
              router.push(router.query.next);
            }
            else{
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
            
            <Flex color={'twiiter.800'} cursor={'pointer'} mt={2} direction={'column'}>
              <NextLink href={'/forgot-password'}><Box ml={'auto'}>Forgot Password?</Box></NextLink>
            <Button
              mt={4}
              color={'white'}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              isLoading={props.isSubmitting}
              type="submit"
              >
              Login
            </Button>
              <NextLink href={'/register'}><Box  ml={'auto'} mt={2}>Create a new account</Box></NextLink>
            </Flex>            
          </Form>
        )}
      </Formik>

    </Wrapper>
  );
};
export default Login