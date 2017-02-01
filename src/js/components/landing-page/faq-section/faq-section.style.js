import {
  softBlackColor, silverSandColor, lightGreyColor, wildSandColor, whiteTwoColor, accentColor, sanFranciscoTextFamily
} from 'utils/styles';


export const headerStyle = {
  base: {
    marginBottom: '34px',
    height: '26px',
    lineHeight: '26px',
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 500,
    borderLeft: `8px solid ${softBlackColor}`,
    color: softBlackColor,
    letterSpacing: '-0.2px',
    paddingLeft: '8px',
    position: 'relative'
  },
  extraWide: {
    fontSize: '14px'
  },
  desktop: {
    fontSize: '13px'
  },
  tablet: {
    fontSize: '12px'
  }
};

export const contentStyle = {
  paddingBottom: '100px',
  borderBottom: `1px solid ${softBlackColor}`
};

export const _loadMoreStyle = {
  fontSize: '16px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 500,
  color: softBlackColor,
  height: '86px',
  textDecoration: 'none',
  padding: '32px 16px',
  display: 'block',
  boxSizing: 'border-box'
};

export const loadMoreStyle = {
  ..._loadMoreStyle,
  background: wildSandColor
};

export const loadMoreHoverStyle = {
  ..._loadMoreStyle,
  background: whiteTwoColor
};

export const linkStyle = {
  color: softBlackColor,
  textDecoration: 'none',
  fontWeight: 100,
  borderBottom: `4px solid ${ silverSandColor }`
};

export const faqStyle = {
  base: {
    color: softBlackColor
  },
  hover: {
    color: accentColor
  }
};

export const lastFaqStyle = {
  base: {
    ...faqStyle.base,
    borderBottom: `1px solid ${lightGreyColor}`
  },
  hover: faqStyle.hover
};

export const wrapperStyle = {
  base: {
    boxSizing: 'border-box'
  },
  extraWide: {
    padding: '66px 16px 0 16px'
  },
  desktop: {
    padding: '32px 16px 0 16px'
  },
  tablet: {
    padding: '32px 16px 0 16px'
  }
};

export const editModeAlignLeftStyle = {
  display: 'inline-block',
  width: 'calc(100% - 125px)',
  textAlign: 'left'
};

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};
