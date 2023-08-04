import { useNavigate } from "@tanstack/router";
import Default from "../components/templates/Default";
import { useState } from "react";
import { Form, Formik } from "formik";
import { Button, Flex, Text, TextInput } from "@mantine/core";

const HomePage = () => {
  const navigation = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <Default>
      <Flex h={"70vh"} maw={"80%"} mx={"auto"} justify={"center"} direction={"column"} gap={16}>
        <Text ta={"center"} fz={56} fw={500}>Travelio Search</Text>
        <Formik initialValues={{}} onSubmit={(values: any) => console.log(values)}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Flex direction={"column"} gap={8}>
                <TextInput
                  placeholder="Cari buku yang Anda inginkan"
                  onChange={(e: any) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
                <Button
                  type="submit"
                  variant="white"
                  className="border-[1px] border-black"
                  onClick={() => navigation({ to: "/books", search: { q: searchInput } })}
                >
                  Cari
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Default>
  );
};

export default HomePage;
