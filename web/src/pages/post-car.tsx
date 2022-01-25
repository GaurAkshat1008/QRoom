import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreateQueryMutation, useMeQuery } from "../generated/graphql";

const PostCar: React.FC<{}> = ({}) => {
  const [, create] = useCreateQueryMutation();
  const [meData] = useMeQuery();
  const router = useRouter();

  return (
    <Wrapper variant="large">
      <Formik
        initialValues={{
          modelY: "",
          carType: "",
          carModel: "",
          km: "",
          description: "",
        }}
        onSubmit={async (values) => {
          const response = await create({
            owner: meData.data.me.username,
            modelY: values.modelY,
            carModel: values.carModel,
            carType: values.carType,
            km: values.km,
            desc: values.description,
          });
          if (response.data?.createQuery.owner) {
            router.push("/browse-cars");
          } else {
            console.log(response.error.message);
          }
        }}
      >
          <Form>
            <InputField
              name={"modelY"}
              placeholder="model year"
              label="Model Year"
              required
            />
            <InputField
              name={"carType"}
              placeholder="car type"
              label="Car Type"
              required
            />
            <InputField
              name={"carModel"}
              placeholder="car model"
              label="Car Model"
              required
            />
            <InputField
              name={"km"}
              placeholder="km"
              label="Kilo Meters"
              required
            />
            <InputField
              name={"description"}
              placeholder="description"
              label="Description"
              textarea
              required
            />
            <Box display={"flex"} flexDir={"row-reverse"}>
              <Button
                type="submit"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                mt={4}
                w={"40%"}
                ml={"auto"}
              >
                Submit
              </Button>
            </Box>
          </Form>
      </Formik>
    </Wrapper>
  );
};

export default PostCar;
