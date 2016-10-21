import {
  softBlackColor, codGrayColor, accentColor, sanFranciscoTextFamily
} from 'utils/styles';


export const hoverColorStyle = {
  color: accentColor
};

export const reportWrapperStyle = {
  backgroundColor: 'white',
  display: 'inline-block',
  cursor: 'pointer'
};

export const sourceWrapperStyle = {
  height: '16px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  marginTop: '43px',
  marginBottom: '29px'
};

const basePublicationStyle = {
  color: codGrayColor,
  fontWeight: 300
};

const basePublishDateStyle = {
  marginLeft: '8px',
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
