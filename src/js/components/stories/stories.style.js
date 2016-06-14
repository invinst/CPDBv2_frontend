import { lightGreyColor, accentColor } from 'utils/styles';


export const accentColorStyle = {
  color: accentColor
};

export const firstSmallStoryStyleTablet = {
  wrapper: {
    borderBottom: `1px solid ${lightGreyColor}`
  }
};

export const firstSmallStoryStyleTabletHover = {
  wrapper: {
    borderBottom: `1px solid ${lightGreyColor}`
  },
  header: accentColorStyle,
  paragraph: accentColorStyle
};


export const firstSmallStoryStyleDesktop = {
  wrapper: {
    borderRight: `1px solid ${lightGreyColor}`
  }
};

export const firstSmallStoryStyleDesktopHover = {
  wrapper: {
    borderRight: `1px solid ${lightGreyColor}`
  },
  header: accentColorStyle,
  paragraph: accentColorStyle
};


export const wrapperStyle = {
  overflow: 'hidden'
};


export const secondSmallStoryStyle = {
  wrapper: {
    paddingTop: '16px'
  }
};

export const secondSmallStoryStyleHover = {
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

export const secondSmallStoryDesktopStyleHover = {
  header: accentColorStyle,
  paragraph: accentColorStyle
};
