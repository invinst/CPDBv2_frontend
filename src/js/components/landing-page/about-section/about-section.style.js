import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const contentWrapperStyle = {
  padding: '0 13px 5px'
};

export const paragraphStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontSize: '26px',
    fontWeight: 500,
    margin: '0 0 30px 0'
  },
  tablet: {
    fontSize: '20px'
  },

  extraWide: {
    fontSize: '36px'
  }
};

export const wrapperStyle = {
  padding: '32px 16px',
  boxSizing: 'border-box',
  borderBottom: 0
};

export const headerStyle = {
  base: {
    height: '26px',
    lineHeight: '26px',
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 500,
    borderLeft: `8px solid ${softBlackColor}`,
    color: softBlackColor,
    letterSpacing: '-0.2px',
    paddingLeft: '8px',
    marginBottom: '66px'
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
  paddingBottom: '16px'
};

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};
