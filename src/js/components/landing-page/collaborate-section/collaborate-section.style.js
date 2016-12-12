import {
  softBlackColor, sanFranciscoTextFamily, fashionPinkColor, pinkishWhiteColor, mistyRoseColor
} from 'utils/styles';


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
    fontSize: '32px'
  },

  extraWide: {
    fontSize: '48px'
  }
};

export const underlinedLinkStyle = {
  fontWeight: 500
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
  boxSizing: 'border-box',
  padding: '32px 16px',
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

export const editLinkBaseStyle = {
  color: fashionPinkColor
};

export const editLinkHoverStyle = editLinkBaseStyle;

export const editLinkUnderlineBaseStyle = {
  backgroundColor: fashionPinkColor,
  opacity: .2
};

export const editLinkUnderlineHoverStyle = {
  backgroundColor: fashionPinkColor,
  opacity: 1
};

export const moreLinkWrapperStyle = {
  textAlign: 'right',
  display: 'inline-block',
  width: '130px'
};

export const editModeWrapperStyle = {
  backgroundColor: pinkishWhiteColor
};

export const buttonStyle = {
  backgroundColor: mistyRoseColor,
  border: '1px solid white',
  borderRadius: '3px',
  marginRight: '10px',
  padding: '5px 7px',
  cursor: 'pointer'
};

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};
