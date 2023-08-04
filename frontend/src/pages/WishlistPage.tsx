import BooksTemplate from "../components/templates/BooksTemplate";
import { useGetListWishlist } from "../services/wishlistService";
import { Card as CardCore, Image, Text, Flex, SimpleGrid } from "@mantine/core";

const Card = ({ title, thumbnail, authors, onClick }: any) => {
  return (
    <CardCore
      className="cursor-pointer"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={onClick}
    >
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
      </Flex>
    </CardCore>
  );
};

const WishlistPage = () => {
  const { data: listWishlistData }: { data: any[] } = useGetListWishlist({ page: 1, limit: 10 });
  return (
    <BooksTemplate>
      <SimpleGrid p={32} cols={6}>
        {listWishlistData.map((item: any, index: number) => (
          <Card
            key={index}
            title={item?.title}
            thumbnail={item?.thumbnail}
            authors={item?.authors}
          />
        ))}
      </SimpleGrid>
    </BooksTemplate>
  );
};

export default WishlistPage;
