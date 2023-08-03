import { useNavigate, useRouter } from "@tanstack/router";
import Default from "../components/templates/Default";
import { useGetListBooks } from "../services/bookService";
import {
  Card as CardCore,
  Image,
  Text,
  Flex,
  Rating,
  Badge,
  TextInput,
  Button,
} from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";

const Card = ({ title, thumbnail, authors, rating }: any) => {
  const rate = (Number(rating) / 300) * 5 || 0;

  return (
    <CardCore shadow="sm" padding="lg" radius="md" withBorder>
      <CardCore.Section>
        <Image src={thumbnail} height={160} alt="Norway" />
      </CardCore.Section>

      <Flex mt={"md"} mb={"xs"} direction={"column"}>
        <Text weight={500}>{title}</Text>
        <Rating value={rate} fractions={5} readOnly />
        <Flex align={"center"} gap={4}>
          <Text size="sm">Author</Text>
          {authors?.map((authorData: any, authorIndex: number) => (
            <Badge className="text-black" bg={"gray"} key={authorIndex}>
              {authorData}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </CardCore>
  );
};

const BooksPage = () => {
  const router = useRouter();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { data: listBooksData }: { data: any[] } = useGetListBooks({
    q: router.state.location.search.q,
  });

  const handleFindBooks = async (values: any) => {
    await navigation({ to: "/books", search: { q: values.searchInput } });
    await queryClient.invalidateQueries("listBooks");
  };

  return (
    <Default>
      <Formik
        initialValues={{ searchInput: "" }}
        onSubmit={(values: any) => handleFindBooks(values)}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Flex mt={40} maw={"80%"} mx={"auto"} direction={"column"} gap={8}>
              <TextInput
                placeholder="Cari buku yang Anda inginkan"
                onChange={(e: any) => setFieldValue("searchInput", e.target.value)}
                value={values.searchInput}
              />
              <Button variant="white" type="submit" className="border-[1px] border-black">
                Cari
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <SimpleGrid maw={"80%"} my={40} mx={"auto"} cols={3}>
        {listBooksData?.map((item: any, index: number) => (
          <Card
            key={index}
            title={item.volumeInfo.title}
            thumbnail={item.volumeInfo.imageLinks.thumbnail}
            authors={item.volumeInfo.authors}
            rating={item.volumeInfo.pageCount}
          />
        ))}
      </SimpleGrid>
    </Default>
  );
};

export default BooksPage;
