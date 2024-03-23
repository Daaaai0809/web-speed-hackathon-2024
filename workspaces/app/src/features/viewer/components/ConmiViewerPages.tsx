import { useRef } from 'react';
import { useAsync } from 'react-use';
import styled from 'styled-components';

import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

import { getImageUrl } from '../../../lib/image/getImageUrl';

const _Canvas = styled.canvas`
    height: 100%;
    width: auto;
    flex-grow: 0;
    flex-shrink: 0;
`;

type Props = {
    props: {
        id: string;
        pageImageId: string;
    }[];
};

export const ComicViewerPages = ({ props }: Props) => {
    const refs = useRef<Array<HTMLCanvasElement | null>>([]);

    useAsync(async () => {
        const canvasPromises = props.map(async (prop, index) => {
            const image = new Image();
            image.src = getImageUrl({
                format: 'jxl',
                imageId: prop.pageImageId,
            });
            await image.decode();

            const canvas = refs.current[index];
            canvas!.width = image.naturalWidth;
            canvas!.height = image.naturalHeight;
            const ctx = canvas!.getContext('2d')!;

            decrypt({
                exportCanvasContext: ctx,
                sourceImage: image,
                sourceImageInfo: {
                    height: image.naturalHeight,
                    width: image.naturalWidth,
                },
            });

            canvas!.setAttribute('role', 'img');
        });

        await Promise.all(canvasPromises);
    }, [props]);

    return (
        <>
            {props.map((prop, index) => (
                <_Canvas key={prop.pageImageId} ref={(el) => (refs.current[index] = el)} />
            ))}
        </>
    );
};
