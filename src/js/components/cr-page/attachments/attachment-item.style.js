import { imgUrl } from 'utils/static-assets';


const fileTypeSpecificThumbnailStyle = {
  audio: () => ({
    backgroundImage: `url(${imgUrl('ic-audio.svg')})`
  }),
  video: () => ({
    backgroundImage: `url(${imgUrl('ic-video.svg')})`
  }),
  document: (imageUrl) => ({
    backgroundImage: `url(${imageUrl})`
  })
};

export const thumbnailStyle = (fileType, imageUrl) => ({
  ...fileTypeSpecificThumbnailStyle[fileType](imageUrl),
});
