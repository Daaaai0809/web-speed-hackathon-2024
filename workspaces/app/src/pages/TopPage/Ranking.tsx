import { useEffect, useId, useState } from "react";
import { RankingCard } from "../../features/ranking/components/RankingCard";
import { Box } from "../../foundation/components/Box";
import { Flex } from "../../foundation/components/Flex";
import { Spacer } from "../../foundation/components/Spacer";
import { Text } from "../../foundation/components/Text";
import { Color, Space, Typography } from "../../foundation/styles/variables";
import { useRankingList } from "../../features/ranking/hooks/useRankingList";
import { useImages } from "../../foundation/hooks/useImage";

export const Ranking = () => {
    const { data: rankingList, isLoading } = useRankingList({ query: {} });

    const rankingA11yId = useId();

    const [images, setImages] = useState<string[]>([]);
    const [authorImages, setAuthorImages] = useState<string[]>([]);

    useEffect(() => {
      if (!isLoading && rankingList) {
        useImages({ height: 96, imageIds: rankingList.map((ranking) => ranking.book.image.id), width: 96 }).then((images) => setImages(images));
        useImages({ height: 32, imageIds: rankingList.map((ranking) => ranking.book.author.image.id), width: 32 }).then((images) => setAuthorImages(images));
      }
    }, [rankingList]);

    return (
        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%" minHeight={"50vh"}>
          <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
            <Flex align="center" as="ul" direction="column" justify="center">
                {
                    rankingList.map((ranking, index) => (
                        <RankingCard
                            authorImageUrl={authorImages[index]}
                            book={ranking.book}
                            imageUrl={images[index]}
                            key={ranking.id}
                        />
                    ))
                }
            </Flex>
          </Box>
        </Box>
    );
}
