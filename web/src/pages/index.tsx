import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Main } from '../components/Main';
import React from 'react'
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { useMeQuery } from '../generated/graphql';
import NextLink from 'next/link'

const Index: React.FC<{}> = ({}) => {

  const [meData] = useMeQuery()
  let body = null

  if(meData.fetching){

  } else if(!meData.data.me){
    // console.log(meData.data)
    body =(
      <Flex flexDir={'row'} justifyContent={'center'}>
        <NextLink href={'/login'}>
        <Button m={2} p={6} variant={'solid'} backgroundColor={'#790FD2BA'} color={'blackAlpha.800'} fontWeight={700}>Sign In</Button>
        </NextLink>
        <NextLink href={'/register'}>
        <Button m={2} p={6} variant={'solid'} backgroundColor={'#FF0080AA'} color={'blackAlpha.900'} fontWeight={700}>Register</Button>
        </NextLink>
      </Flex>
    )
  }
  else if(meData.data){
    // console.log(meData.data.me !== null)
    body = (
      <Flex justifyContent={'center'}>
        <NextLink href={'./post-car'}>
        <Button  m={2} p={6} variant={'solid'} backgroundColor={'#790FD2FD'}  color={'blackAlpha.800'} fontWeight={700}>Post your Car</Button>
        </NextLink> 
        <NextLink href={'./browse-cars'}>
        <Button  m={2} p={6} variant={'solid'} backgroundColor={'#FF0080FD'} color={'blackAlpha.800'} fontWeight={700}>Browse Cars</Button>
        </NextLink> 
        </Flex>
    )
  }
    return (
      <Main>
      {/* <DarkModeSwitch /> */}
      <Hero title='CarSell' key={'carsell'} />
      {body}
      </Main>
    );
}

export default Index