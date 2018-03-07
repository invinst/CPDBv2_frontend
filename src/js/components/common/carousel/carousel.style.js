
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

export const carouselWrapperStyle = {
  float: 'right',
  width: `calc(100% - ${headerSectionWidth}px)`,
  position: 'relative'
};

export const innerSlideCarouselStyle = {
  width: `${slideWidth}px`,
  margin: 0
};
