import {
  softBlackColor, codGrayColor, altoColor, accentColor, sanFranciscoTextFamily
} from 'utils/styles';


export const hoverColorStyle = {
  color: accentColor
};

export const storyWrapperStyle = {
  backgroundColor: 'white',
  width: '100%',
  cursor: 'pointer'
};

export const sourceWrapperStyle = {
  height: '16px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  paddingLeft: '13px',
  marginTop: '16px',
  marginBottom: '30px'
};

export const sourceStyle = {
  base: {
    color: codGrayColor,
    fontWeight: 500
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

export const publicationDateStyle = {
  base: {
    marginLeft: '8px',
    color: softBlackColor,
    fontWeight: 300,
    opacity: .5
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

export const titleStyle = {
  base: {
    color: softBlackColor,
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 300,
    padding: '0 16px 66px 13px'
  },

  extraWide: {
    small: {
      fontSize: '16px'
    },
    normal: {
      fontSize: '20px'
    },
    big: {
      fontSize: '32px'
    },
    extraBig: {
      fontSize: '32px'
    },
    ultraBig: {
      fontSize: '48px'
    }
  },

  desktop: {
    small: {
      fontSize: '16px'
    },
    normal: {
      fontSize: '16px'
    },
    big: {
      fontSize: '26px'
    },
    extraBig: {
      fontSize: '32px'
    },
    ultraBig: {
      fontSize: '48px'
    }
  },

  tablet: {
    small: {
      fontSize: '16px'
    },
    normal: {
      fontSize: '16px'
    },
    big: {
      fontSize: '26px'
    },
    extraBig: {
      fontSize: '32px'
    },
    ultraBig: {
      fontSize: '48px'
    }
  },

  underline: {
    borderBottom: `1px solid ${altoColor}`
  }
};
