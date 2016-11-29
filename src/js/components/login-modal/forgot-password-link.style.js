import {
  mediumGrayColor, altoColor
} from 'utils/styles';

export const forgotPasswordLinkStyle = {
  base: {
    base: {
      cursor: 'pointer',
      color: mediumGrayColor,
      marginLeft: '20px'
    },
    hover: {
      cursor: 'pointer',
      color: mediumGrayColor,
      marginLeft: '20px'
    }
  },
  underline: {
    base: {
      opacity: 0
    },
    hover: {
      opacity: 1,
      backgroundColor: altoColor
    }
  }
};

export const linkWrapperStyle = {
  display: 'inline-block',
  padding: '10px 0'
};
