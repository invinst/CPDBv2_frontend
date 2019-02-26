import { imgUrl } from 'utils/static-assets';


const fileTypeSpecificThumbnailStyle = {
  audio: () => ({
    backgroundImage: `url(${imgUrl('ic-audio.svg')})`
  }),
  video: (imageUrl) => ({
    backgroundImage: imageUrl ? `url(${imageUrl})` : `url(${imgUrl('ic-video.svg')})`
  }),
  document: (imageUrl) => ({
    backgroundImage: `url(${imageUrl})`
  })
};

export const thumbnailStyle = (fileType, imageUrl) => ({
  ...fileTypeSpecificThumbnailStyle[fileType](imageUrl),
});
