import { useEffect, useState } from "react";
import { EpisodeListItem } from "../../../features/episode/components/EpisodeListItem";
import { Flex } from "../../../foundation/components/Flex";
import { Space } from "../../../foundation/styles/variables";
import { useImages } from "../../../foundation/hooks/useImage";
import { Box } from "../../../foundation/components/Box";
import { useEpisodeList } from "../../../features/episode/hooks/useEpisodeList";

export const Episodes = ({ bookId }: { bookId: string; }) => {
    const { data: episodeList, isLoading } = useEpisodeList({ query: { bookId } });

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        if (episodeList.length > 0 && !isLoading) {
            useImages({ height: 96, imageIds: episodeList.map((episode) => episode.image.id), width: 96 }).then((urls) => setImageUrls(urls));
        }
    }, [episodeList]);

    return (
        <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
            <Flex align="center" as="ul" direction="column" justify="center">
              {episodeList.map((episode, index) => (
                <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} imageUrl={imageUrls[index]} />
              ))}
            </Flex>
        </Box>
    );
}
