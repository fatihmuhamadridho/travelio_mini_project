import { useNavigate, useRouter } from "@tanstack/router";
import { useGetListBooks } from "../services/bookService";
import { Card as CardCore, Image, Text, Flex, Rating, Center } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { useGetListWishlist } from "../services/wishlistService";
import BooksTemplate from "../components/templates/BooksTemplate";

const Card = ({ title, thumbnail, authors, rating, onClick }: any) => {
  const rate = (Number(rating) / 300) * 5 || 0;

  return (
    <CardCore className="cursor-pointer" shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <CardCore.Section>
        <Image src={thumbnail} height={160} alt="Norway" />
      </CardCore.Section>

      <Flex mt={"md"} mb={"xs"} direction={"column"}>
        <Text className="truncate" weight={500}>
          {title}
        </Text>
        <Flex className="truncate">
          {authors?.map((authorData: any, authorIndex: number) => (
            <Text fz={10} key={authorIndex}>
              {authorData}
            </Text>
          ))}
        </Flex>
        <Flex mt={8} align={"center"}>
          <Rating value={rate / 2} fractions={5} readOnly size="xs" />
          <Text fz={10}>{String(rate).slice(0, 4)}</Text>
        </Flex>
      </Flex>
    </CardCore>
  );
};

const BooksPage = () => {
  const router = useRouter();
  const navigation = useNavigate();
  const queryPage = router.state.location.search.q;

  const { data: listBooksData }: { data: any[] } = useGetListBooks({
    q: queryPage,
  });
  const { data: listWishlistData }: { data: any[] } = useGetListWishlist({ page: 1, limit: 10 });

  console.log({ listBooksData, listWishlistData, queryPage });

  return (
    <BooksTemplate>
      {(queryPage === "" || queryPage === undefined) && (
        <Center>
          <Text>Harap masukkan kueri di kotak penelusuran di atas.</Text>
        </Center>
      )}
      <SimpleGrid maw={"80%"} my={40} mx={"auto"} cols={6}>
        {listBooksData?.map((item: any, index: number) => (
          <Card
            key={index}
            title={item.volumeInfo.title}
            thumbnail={item?.volumeInfo?.imageLinks?.thumbnail}
            authors={item.volumeInfo.authors}
            rating={item.volumeInfo.pageCount}
            onClick={() => navigation({ to: `/books/${item.id}` })}
          />
        ))}
      </SimpleGrid>
    </BooksTemplate>
  );
};

export default BooksPage;
