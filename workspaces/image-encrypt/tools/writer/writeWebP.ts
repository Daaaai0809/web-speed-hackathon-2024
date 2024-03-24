import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

import type { WriteImageFunction } from './WriteImageFunction';

export const writeWebP: WriteImageFunction = async ({ filepath, imageData }) => {
  // Convert ImageData to Buffer
  const imageBuffer = Buffer.from(imageData.data.buffer);

  const outputBuffer = await sharp(imageBuffer, { raw: { width: imageData.width, height: imageData.height, channels: 4 } })
    .webp({ quality: 70 })
    .toBuffer();

  await fs.mkdir(path.dirname(filepath), { recursive: true }).catch(() => {});
  await fs.writeFile(filepath, outputBuffer);
};
