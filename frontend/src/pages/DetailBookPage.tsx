import { Button, Flex, Image, Text } from "@mantine/core";
import BooksTemplate from "../components/templates/BooksTemplate";
import { useGetDetailBook } from "../services/bookService";
import { useRouter } from "@tanstack/router";
import { IconHeart } from "@tabler/icons-react";
import { WishlistService, postWishlistProps } from "../services/wishlistService/wishlist";

const DetailBookPage = () => {
  const router = useRouter();
  const volumeId = router.state.location.pathname.split("/")[2];
  const { data: detailBookData } = useGetDetailBook(volumeId);

  console.log({ detailBookData });

  const handleAddWishlist = async (payload: postWishlistProps) => {
    try {
      const response = await WishlistService.postWishlist(payload);

      if (response.status === 200) {
        alert("Berhasil menambahkan wishlist!");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <BooksTemplate>
      <Flex p={32} justify={"space-between"} gap={32}>
        <Flex direction={"column"}>
          <Text fz={56} fw={600}>
            {detailBookData?.volumeInfo.title}
          </Text>
          <Button
            variant="default"
            onClick={() =>
              handleAddWishlist({
                volumeId: volumeId,
                title: detailBookData?.volumeInfo.title,
                subtitle: detailBookData?.volumeInfo.subtitle,
                authors: detailBookData?.volumeInfo.authors,
                thumbnail: detailBookData?.volumeInfo.imageLinks.thumbnail,
              })
            }
          >
            <IconHeart />
            <Text>Jadikan wishlist</Text>
          </Button>
          <Flex>
            {detailBookData?.volumeInfo.authors?.map((authorData: any, authorIndex: number) => (
              <Text color="blue" key={authorIndex}>
                {authorData}
              </Text>
            ))}
          </Flex>
          <Text fz={22} fw={500}>
            Tentang Buku Ini
          </Text>
          <Text>{detailBookData?.volumeInfo.subtitle}</Text>
        </Flex>
        <Image
          className="min-w-[230px]"
          width={"auto"}
          height={345}
          src={detailBookData?.volumeInfo.imageLinks.thumbnail}
          alt="detail-image"
        />
      </Flex>
    </BooksTemplate>
  );
};

export default DetailBookPage;
