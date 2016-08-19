import { altoColor, wildSandColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';
import { BASE_TEMPLATE, SOLID_TEMPLATE } from 'utils/constants';


export const sectionWrapperStyle = {
  [BASE_TEMPLATE]: {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderBottom: `1px solid ${altoColor}`,
    paddingBottom: '16px'
  },

  [SOLID_TEMPLATE]: {
    boxSizing: 'border-box',
    backgroundColor: wildSandColor,
    paddingBottom: '16px'
  }
};


export const headerStyle = {
  [BASE_TEMPLATE]: {
    backgroundColor: 'white',
    height: '26px',
    lineHeight: '26px',
    fontFamily: sanFranciscoTextFamily,
    fontSize: '13px',
    color: softBlackColor,
    letterSpacing: '-0.2px',
    borderLeft: `8px solid ${softBlackColor}`,
    paddingLeft: '8px',
    marginBottom: '66px'
  },

  [SOLID_TEMPLATE]: {
    backgroundColor: wildSandColor,
    height: '26px',
    lineHeight: '26px'
  }
};

export const contentStyle = {
  [BASE_TEMPLATE]: {
    backgroundColor: 'white',
    paddingBottom: '16px'
  },

  [SOLID_TEMPLATE]: {
    backgroundColor: wildSandColor
  }
};
