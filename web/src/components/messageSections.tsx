import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react'
import { Exact, useCreateMessageMutation, useMeQuery, useMessagesByRoomQuery, useUserByIdMutation} from '../generated/graphql';
import { InputField } from './inputField';
import { MessageBox } from './messageBox';

interface token{
  token:string
}

export const MessageSections: React.FC<token> = ({token}) => {
  const [meData] = useMeQuery()
    const [, newMessage] = useCreateMessageMutation()
    const [{data}] = useMessagesByRoomQuery({
      variables:{
        token:token
      }
    })
    const [, getUser] = useUserByIdMutation()
    let body = null
    if(!data?.messagesByRoom){
      
    }else{
       body = (
          data.messagesByRoom.map((object) => {
            return (<MessageBox variant={object.owner === meData.data.me.id ? 'me' : 'they'}>{object.message} {object.owner}</MessageBox>)
          })
       )
    }
    return (
      <Flex flexDirection={'column'}>
        <Box flex={'0.9'} backgroundColor={'green.100'} p={2} overflowX={'hidden'}>
          <Box height={'60vh'} p={4}>
           {body} 
          </Box>
        </Box>
        <Box flex={'0.1'} p={2}>
          <Formik
          initialValues={{text:""}}
          onSubmit={
            async (values, {setErrors}) => {
              if(values.text !== ' '){
                if(!!(values.text).trim()){
                  const message = await newMessage({token:token, text:values.text})
                  // Router.reload()
                }
                else{
                  setErrors({text:"Cannot be empty"})
                }
                values.text = ""
              }
            }
          }
          >
            <Form>
                <Flex alignContent={'center'}  justifyContent={'center'} flexDirection={'row'}>
              <InputField 
              name="text"
              placeholder='text'
              label=''
              / >
                <Button type='submit' ml={2} mt={2} p={4} backgroundColor={'teal'} variant={'ghost'}>Send</Button>
                </Flex>
            </Form>
          </Formik>
        </Box>
      </Flex>
    );
}