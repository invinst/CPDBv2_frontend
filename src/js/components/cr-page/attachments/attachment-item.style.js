import {
  whiteTwoColor, clayGray, sugarCaneColor
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  width: '104px',
  marginRight: '16px',
  marginTop: '20px',
  paddingBottom: '8px',
  textDecoration: 'none',
  display: 'inline-block',
  verticalAlign: 'top'
};

const fileTypeSpecificThumbnailStyle = {
  audio: () => ({
    background: `${sugarCaneColor} url(${imgUrl('ic-audio.svg')}) no-repeat center center`
  }),
  video: () => ({
    background: `${sugarCaneColor} url(${imgUrl('ic-video.svg')}) no-repeat center center`
  }),
  document: (imageUrl) => ({
    background: `${sugarCaneColor} url(${imageUrl}) no-repeat center center/cover`
  })
};

export const thumbnailStyle = (fileType, imageUrl) => ({
  width: '45px',
  height: '60px',
  border: `1px solid ${whiteTwoColor}`,
  margin: '0 auto 8px',
  ...fileTypeSpecificThumbnailStyle[fileType](imageUrl),
});

export const titleStyle = {
  color: clayGray,
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 400
};
