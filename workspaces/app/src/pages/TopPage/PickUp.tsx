import { FeatureCard } from "../../features/feature/components/FeatureCard";
import { Box } from "../../foundation/components/Box";
import { Flex } from "../../foundation/components/Flex";
import { Spacer } from "../../foundation/components/Spacer";
import { Text } from "../../foundation/components/Text";
import { Color, Space, Typography } from "../../foundation/styles/variables";
import { useFeatureList } from "../../features/feature/hooks/useFeatureList";
import { useImages } from "../../foundation/hooks/useImage";
import { useEffect, useId, useState } from "react";

export const PickUp = () => {
    const { data: featureList, isLoading } = useFeatureList({ query: {} });

    const imageIds = featureList.map((feature) => feature.book.image.id);
    const authorImageIds = featureList.map((feature) => feature.book.author.image.id);

    const [images, setImages] = useState<string[]>([]);
    const [authorImages, setAuthorImages] = useState<string[]>([]);

    const pickupA11yId = useId();

    // const images = await useImages({ height: 96, imageIds, width: 96 });
    // const authorImages = await useImages({ height: 32, imageIds: authorImageIds, width: 32 });

    useEffect(() => {
      if (!isLoading && featureList) {
        useImages({ height: 96, imageIds, width: 96 }).then((images) => setImages(images));
        useImages({ height: 32, imageIds: authorImageIds, width: 32 }).then((images) => setAuthorImages(images));
      }
    }, [featureList]);

    return (
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden" height={206}>
            <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
              {
                featureList.map((feature, index) => (
                  <FeatureCard
                    authorImageUrl={authorImages[index]}
                    book={feature.book}
                    imageUrl={images[index]}
                    key={feature.id}
                  />
                ))
              }
            </Flex>
          </Box>
        </Box>
    );
}

