import { altoColor, wildSandColor } from 'utils/styles';


export const sectionWrapperStyle = {
  base: {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderBottom: `1px solid ${altoColor}`,
    paddingBottom: '16px'
  },

  solid: {
    backgroundColor: wildSandColor,
    borderBottom: 0
  }
};


export const headerStyle = {
  base: {
    backgroundColor: 'white',
    height: '26px',
    lineHeight: '26px',
    fontFamily: '"San Francisco Text Web", sans-serif',
    fontSize: '15px',
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '-0.2px',
    borderLeft: `8px solid ${altoColor}`,
    paddingLeft: '5px',
    marginBottom: '16px'
  },

  solid: {
    backgroundColor: wildSandColor,
    height: '26px',
    lineHeight: '26px'
  }
};

export const contentStyle = {
  base: {
    backgroundColor: 'white'
  },

  solid: {
    backgroundColor: wildSandColor
  }
};
