import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const headerStyle = {
  base: {
    marginBottom: '50px',
    height: '26px',
    lineHeight: '26px',
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 500,
    letterSpacing: '.5px',
    borderLeft: `8px solid ${softBlackColor}`,
    color: softBlackColor,
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

export const linkStyle = {
  color: softBlackColor,
  textDecoration: 'none',
  fontWeight: 100
};

export const alignRightStyle = {
  display: 'inline-block',
  width: '130px',
  textAlign: 'right'
};

export const wrapperStyle = {
  base: {
    boxSizing: 'border-box'
  },
  extraWide: {
    padding: '58px 16px 0 16px'
  },
  desktop: {
    padding: '57px 16px 0 16px'
  },
  tablet: {
    padding: '44px 16px 0 16px'
  }
};

export const contentStyle = {
  paddingBottom: '100px',
  borderBottom: `1px solid ${softBlackColor}`
};

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};

export const moreButtonStyle = {
  display: 'inline-block',
  float: 'right'
};
