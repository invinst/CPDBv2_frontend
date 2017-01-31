import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';
import { TABLET_BREAK_POINT, DESKTOP_BREAK_POINT } from 'utils/constants';


export const contentStyle = {
  paddingBottom: '39px',
  paddingLeft: '12px'
};

export const paragraphStyle = {
  base: {
    fontFamily: sanFranciscoTextFamily,
    fontSize: '36px',
    fontWeight: 500,
    margin: '0 0 30px 0'
  },

  tablet: {
    fontSize: '26px'
  },

  desktop: {
    fontSize: '36px'
  },

  extraWide: {
    fontSize: '48px'
  }
};

export const paragraphWrapperStyle = {
  tablet: {
    color: softBlackColor,
    width: '620px'
  },
  desktop: {
    color: softBlackColor,
    width: '736px'
  },
  extraWide: {
    color: softBlackColor,
    width: '902px'
  }
};

export const wrapperStyle = {
  base: {
    boxSizing: 'border-box',
    borderBottom: 0
  },
  extraWide: {
    padding: '66px 16px 32px 16px'
  },
  desktop: {
    padding: '30px 16px 32px 16px'
  },
  tablet: {
    padding: '30px 16px 32px 16px'
  }
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

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};

export const underlinedLinkStyle = () => {
  const screenWidth = window.innerWidth;
  let underlineHeight = '7px';

  /* istanbul ignore next */
  if (screenWidth >= TABLET_BREAK_POINT && screenWidth < DESKTOP_BREAK_POINT) {
    underlineHeight = '9px';
  } else if (screenWidth >= DESKTOP_BREAK_POINT) {
    underlineHeight = '13px';
  }

  return {
    underline: {
      base: {
        height: underlineHeight,
        bottom: `-${underlineHeight}`
      },
      hover: {
        height: underlineHeight,
        bottom: `-${underlineHeight}`
      }
    }
  };
};
