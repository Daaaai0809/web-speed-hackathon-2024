import { useEffect, useState } from "react";
import { EpisodeListItem } from "../../../features/episode/components/EpisodeListItem";
import { useEpisodeList } from "../../../features/episode/hooks/useEpisodeList";
import { Flex } from "../../../foundation/components/Flex";
import { Spacer } from "../../../foundation/components/Spacer";
import { Text } from "../../../foundation/components/Text";
import { Color, Space, Typography } from "../../../foundation/styles/variables";
import { useImages } from "../../../foundation/hooks/useImage";

export const Episodes = ({ bookId, setLatestEpisode }: { bookId: string; setLatestEpisode: (episodeId: string) => void }) => {
    const { data: episodeList, isLoading } = useEpisodeList({ query: { bookId } });

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        if (episodeList.length > 0) {
            setLatestEpisode(episodeList.find((episode) => episode.chapter === 1)!.id);
        }

        if (episodeList.length > 0 && !isLoading) {
            useImages({height: 96, imageIds: episodeList.map((episode) => episode.image.id), width: 96}).then((urls) => setImageUrls(urls));
        }
    }, [episodeList, setLatestEpisode]);

    return (
        <section aria-label="エピソード一覧">
            <Flex align="center" as="ul" direction="column" justify="center">
              {episodeList.map((episode, index) => (
                <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} imageUrl={imageUrls[index]} />
              ))}
              {episodeList.length === 0 && (
                <>
                  <Spacer height={Space * 2} />
                  <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                    この作品はまだエピソードがありません
                  </Text>
                </>
              )}
            </Flex>
        </section>
    );
}
