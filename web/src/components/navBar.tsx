//#1a202c background color
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={3} p={1}>{data.me.username}</Box>
        <Button
          backgroundColor={"red.500"}
          variant={"ghost"}
          onClick={async() => {
            await logout();
            router.replace("/")
          }}
          isLoading={logoutFetching}
        >
          Log Out
        </Button>
      </Flex>
    );
  }
  return (
    <Flex color={'#FCF6F5'} position={"sticky"} top={0} zIndex={1} bg="#990011" p={4}>
      <Flex flex={1} m={'auto'} maxW={800} align={'center'}>
      <NextLink href={"/"}>
        <Link>
          <Heading>QRoom</Heading>
        </Link>
      </NextLink>
      <Box ml={"auto"} fontSize={20} fontWeight={600} fontFamily={"heading"}>
        {body}
      </Box>
      </Flex>
    </Flex>
  );
};
