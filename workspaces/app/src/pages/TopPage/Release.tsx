import { useEffect, useId, useState } from "react";
import { BookCard } from "../../features/book/components/BookCard";
import { Box } from "../../foundation/components/Box";
import { Flex } from "../../foundation/components/Flex";
import { Spacer } from "../../foundation/components/Spacer";
import { Text } from "../../foundation/components/Text";
import { Color, Space, Typography } from "../../foundation/styles/variables";
import { useRelease } from "../../features/release/hooks/useRelease";
import dayjs from "dayjs";
import { getDayOfWeekStr } from "../../lib/date/getDayOfWeekStr";
import { useImages } from "../../foundation/hooks/useImage";

export const Release = () => {
    const todayStr = getDayOfWeekStr(dayjs());
    const { data: release, isLoading } = useRelease({ params: { dayOfWeek: todayStr } });

    const todayA11yId = useId();

    const [images, setImages] = useState<string[]>([]);
    const [authorImages, setAuthorImages] = useState<string[]>([]);

    useEffect(() => {
        if (!isLoading && release) {
            useImages({ height: 128, imageIds: release.books.map((book) => book.image.id), width: 192 }).then((images) => setImages(images));
            useImages({ height: 32, imageIds: release.books.map((book) => book.author.image.id), width: 32 }).then((images) => setAuthorImages(images));
        }
    }, [release]);

    return (
        <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
            本日更新
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" gap={Space * 2} justify="flex-start">
                {
                    release.books.map((book, index) => (
                        <BookCard
                            authorImageUrl={authorImages[index]}
                            book={book}
                            imageUrl={images[index]}
                            key={book.id}
                        />
                    ))
                }
            </Flex>
          </Box>
        </Box>
    )
};
