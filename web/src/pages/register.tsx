import { Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react'
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/errorMap';
import NextLink from 'next/link'
import { withUrqlClient } from 'next-urql';
import { createURQLClient } from '../utils/createURQLClient';

// interface registerProps {

// }

const Register: React.FC<{}> = ({}) => {
  const [, register] = useRegisterMutation()
    return (
      <Wrapper variant='small'>
        <Formik initialValues={{username: "", password: "" }} 
            onSubmit={async (values, { setErrors }) => {
               const response = await register({username:values.username, password:values.password})
               if(response.data?.register.errors){
               setErrors(toErrorMap(response.data.register.errors))
            } else if(response.data?.register.user){
                //worked
                router.push("/")
            }
            }}>
                {(props) => (
                    <Form>
                        <InputField name='username' placeholder='username' label='Username' />
                        <Box mt={4}>
                            <InputField name='password' placeholder='password' label='Password' type={'password'} />
                        </Box>
                        <Flex color={'blue.100'} cursor={'pointer'} direction={'column'}>
                            <NextLink href={"/login"}><Box ml={'auto'} mt={2}>Already a User?</Box></NextLink>
                        <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit'>Register</Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
      </Wrapper>
    );
}

export default withUrqlClient(createURQLClient)(Register)