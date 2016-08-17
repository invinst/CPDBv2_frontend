import { lightGreyColor, accentColor } from 'utils/styles';


export const accentColorStyle = {
  color: accentColor
};

export const firstNoImageStoryStyleTablet = {
  wrapper: {
    borderBottom: `1px solid ${lightGreyColor}`
  }
};

export const firstNoImageStoryStyleTabletHover = {
  wrapper: {
    borderBottom: `1px solid ${lightGreyColor}`
  },
  header: accentColorStyle,
  paragraph: accentColorStyle
};


export const firstNoImageStoryStyleDesktop = {
  wrapper: {
    borderRight: `1px solid ${lightGreyColor}`
  }
};

export const firstNoImageStoryStyleDesktopHover = {
  wrapper: {
    borderRight: `1px solid ${lightGreyColor}`
  },
  header: accentColorStyle,
  paragraph: accentColorStyle
};


export const wrapperStyle = {
  overflow: 'hidden'
};


export const secondNoImageStoryStyle = {
  wrapper: {
    paddingTop: '16px'
  }
};

export const secondNoImageStoryStyleHover = {
  wrapper: {
    paddingTop: '16px'
  },
  header: accentColorStyle,
  paragraph: accentColorStyle
};

export const storyMediumHoverStyle = {
  header: accentColorStyle,
  paragraph: accentColorStyle
};

export const secondNoImageStoryDesktopStyleHover = {
  header: accentColorStyle,
  paragraph: accentColorStyle
};
