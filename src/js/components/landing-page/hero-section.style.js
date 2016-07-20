import { accentColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = {
  backgroundColor: 'white'
};

export const innerWrapperStyle = {
  padding: '33px 36px 88px 36px'
};

export const contentStyle = {
  padding: '17px 24px 0 0'
};

export const linkStyle = {
  base: {
    color: accentColor,
    fontSize: '18px',
    fontFamily: sanFranciscoTextFamily,
    fontWeight: '500',
    textDecoration: 'none',
    ':hover': {
      color: softBlackColor
    }
  }
};

export const desktopLinkStyle = {
  fontSize: '16px'
};

export const tabletLinkStyle = {
  fontSize: '13px'
};

export const paragraphStyle = {
  WebkitMarginAfter: '1.5em'
};

export const previewImageStyle = {
  height: '526px'
};

export const previewImageDesktopStyle = {
  height: '429px'
};

export const previewImageTabletStyle = {
  height: '325px'
};
