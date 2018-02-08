import { softBlackColor, clayGray } from 'utils/styles';

export const slideWidth = 232;
export const spaceSlideWidth = 8;
export const maxSlideWidth = slideWidth + spaceSlideWidth * 2;
export const headerSectionWidth = 320;

export const wrapperStyle = {
  width: '100%',
  height: '266px',
  marginTop: '48px'
};

export const headerWrapperStyle = {
  width: `${headerSectionWidth}px`
};

export const headerStyle = {
  fontSize: '26px',
  fontWeight: 500,
  textAlign: 'left',
  color: softBlackColor,
  // padding: '16px',
  padding: '0 16px',
  marginBottom: '16px'
};

export const headerTextStyle = {
  padding: '16px',
  fontSize: '14px',
  textAlign: 'left',
  fontWeight: 500,
  color: clayGray
};

export const carouselWrapperStyle = {
  float: 'right',
  width: `calc(100% - ${headerSectionWidth}px)`,
  position: 'relative'
};

export const innerSlideCarouselStyle = {
  width: `${slideWidth}px`,
  margin: 0
};
