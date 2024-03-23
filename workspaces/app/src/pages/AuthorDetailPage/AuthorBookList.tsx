import { useEffect, useState } from "react"
import { BookListItem } from "../../features/book/components/BookListItem"
import { Flex } from "../../foundation/components/Flex"
import { Spacer } from "../../foundation/components/Spacer"
import { Text } from "../../foundation/components/Text"
import { Color, Space, Typography } from "../../foundation/styles/variables"
import { useImages } from "../../foundation/hooks/useImage"

type Author = {
    books: {
        id: string;
        name: string;
        description: string;
        episodes: {
            id: string;
            name: string;
            description: string;
            chapter: number;
        }[];
        image: {
            id: string;
            alt: string;
        };
    }[];
    id: string;
    name: string;
    description: string;
    image: {
        id: string;
        alt: string;
    };
}

export const AuthorBookList = ({ author }: { author: Author }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        if (author.books.length > 0) {
            useImages({height: 64, imageIds: author.books.map((book) => book.image.id), width: 64}).then((urls) => setImageUrls(urls));
        }
    }, [author.books]);

    return (
        <Flex align="center" as="ul" direction="column" justify="center">
          {author.books.map((book, index) => (
            <BookListItem key={book.id} book={book} imageUrl={imageUrls[index]} /> 
          ))}
          {author.books.length === 0 && (
            <>
              <Spacer height={Space * 2} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作者の作品はありません
              </Text>
            </>
          )}
        </Flex>
    )
}
