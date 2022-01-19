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
import { MessageSections } from "../../components/messageSections";
import { toErrorMap } from "../../utils/errorMap";

const Room: NextPage<{ token: string }> = ({ token }) => {
  // console.log(token);
  const router = useRouter()
  const [meData] = useMeQuery()
  const [roomData] = useRoomQuery({
    variables:{
     token:token
    }
  })
  const [, deleteRoom] = useDeleteRoomMutation()
  let body = null
  if(!meData){
    body = (
      <>pls login</>
    )
  }
  if(roomData.fetching){

  }
  if(roomData.data){
    body = (
      <>
      <Flex justifyContent={'space-between'}>
      <Box border={'1px'} p={4}>
        <Text>Room details</Text>
        <Text>Room Name :{roomData.data.room.name}</Text>
      </Box>
        <Button
          onClick={() =>{
            deleteRoom({id:roomData.data.room.id})
            router.push('/')
          }}
          backgroundColor={'red.400'}
          variant={'ghost'}
        >
          delete room
          </Button>
      </Flex>
      <Box mt={4}>
          <MessageSections token={`${token}`} />
      </Box>
          </>
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
