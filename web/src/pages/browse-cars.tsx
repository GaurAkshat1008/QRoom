import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { CarBox } from "../components/carBox";
import { useCarsQuery, useMeQuery } from "../generated/graphql";

const BrowseCars: React.FC<{}> = ({}) => {
  const router = useRouter()
  const [{ data }] = useCarsQuery();
  const [meData] = useMeQuery()
  let body = null;
  if (data?.cars) {
    if(!meData.data?.me){
      router.replace('/login')
    }
    // console.log("worked");
    body =(
      data.cars.map((object) => {
        return (
          <Box>
        <CarBox
          modelY={`${object.modelY}`}
          carType={`${object.carType}`}
          carModel={`${object.carModel}`}
          km={`${object.km}`}
          desc={`${object.desc}`}
          ></CarBox>
          </Box>
      );
    })
    );
    
  }
  return(
    <Box padding={10}>
    <SimpleGrid minChildWidth={'15em'} spacing={'4em'}>{body}</SimpleGrid>;
    </Box>
    ) 
};

export default BrowseCars;
