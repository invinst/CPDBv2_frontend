import {
  softBlackColor, codGrayColor, accentColor, sanFranciscoTextFamily
} from 'utils/styles';


export const hoverColorStyle = {
  color: accentColor
};

export const reportWrapperStyle = {
  backgroundColor: 'white',
  display: 'inline-block',
  cursor: 'pointer',
  padding: '43px 16px 14px 16px',
  boxSizing: 'border-box'
};

export const sourceWrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  marginBottom: '29px'
};

const basePublicationStyle = {
  color: codGrayColor,
  display: 'inline-block',
  marginRight: '8px',
  fontWeight: 300
};

const basePublishDateStyle = {
  display: 'inline-block',
  color: softBlackColor,
  fontWeight: 300,
  opacity: .5
};

export const publishDateStyle = {
  extraWide: {
    ...basePublishDateStyle,
    fontSize: '14px'
  },
  desktop: {
    ...basePublishDateStyle,
    fontSize: '13px'
  },
  tablet: {
    ...basePublishDateStyle,
    fontSize: '12px'
  }
};

export const publicationStyle = {
  extraWide: {
    ...basePublicationStyle,
    fontSize: '14px'
  },
  desktop: {
    ...basePublicationStyle,
    fontSize: '13px'
  },
  tablet: {
    ...basePublicationStyle,
    fontSize: '12px'
  }
};


export const titleStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 500
  }
};

export const responsiveWrapperStyle = {
  display: 'inline-block'
};
