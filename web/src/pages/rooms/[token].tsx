import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputField } from "../../components/inputField";
import { Layout } from "../../components/layout";
import { Wrapper } from "../../components/wrapper";
import { useDeleteRoomMutation, useMatchPasswordMutation, useMeQuery, useRoomQuery } from "../../generated/graphql";
import NextLink from 'next/link'

const Room: NextPage<{ token: string }> = ({ token }) => {
  // console.log(token);
  const router = useRouter()
  const [meData] = useMeQuery()
  const [roomData] = useRoomQuery({
    variables:{
     token:token
    }
  })
  const [, deletRoom] = useDeleteRoomMutation()
  const [isAdmited, setIsAdmited] = useState(false)
  const [, pass] = useMatchPasswordMutation()
  const [isDeleted, setIsDeleted] = useState(false)
  let body = null
  if(!meData){
    body = (
      <>pls login</>
    )
  }
  if(meData.fetching || roomData.fetching){

  } else if(meData.data?.me?.id !== roomData.data?.room?.owner && isAdmited === false){
    body = (
      <>
      <Formik
        initialValues={{password:""}}
        onSubmit={async (values) => {
            const bool = await pass({token:token, password:values.password})
            // console.log(bool);
            setIsAdmited(bool.data?.matchPassword)
          }
        }
      >
        {(props) => (
            <Form>
            <InputField
              name="password"
              placeholder="Enter a password"
              label="Password"
              type={'password'}
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
                w={'30%'}
                justifyContent={'center'}
                alignSelf={'end'}
                >
                enter room
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      </>
    )
  }  
  else if (meData.data?.me?.id !== roomData.data?.room?.owner && isAdmited === true && isDeleted === false){
    body = (
      <Wrapper>
      {/* <div>token is: {token} </div> */}
      <NextLink href={'/'}>
      <Button>Leave</Button>
      </NextLink>
      </Wrapper>
    )
  }
  else{
    body = (
      <Flex justifyContent={'space-between'}>
      <Box border={'1px'} p={4}>
        <Text>Room details</Text>
        <Text>Room Name :{roomData.data.room.name}</Text>
      </Box>
        <Button
          onClick={() =>{
            deletRoom({id:roomData.data.room.id})
            setIsDeleted(true)
            router.push('/')
          }}
          backgroundColor={'red.400'}
          variant={'ghost'}
        >
          delete room
          </Button>
      </Flex>
    )
  }

  return (
    <Layout variant="regular">
    {body}
    </Layout>
  );
};

Room.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default Room;
