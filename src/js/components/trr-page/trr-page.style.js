import {
  sanFranciscoTextFamily, softBlackColor, whiteTwoColor, sugarCaneColor
} from 'utils/styles';


export const wrapperStyle = {
  position: 'relative',
  backgroundColor: sugarCaneColor,
  borderBottom: `1px solid ${whiteTwoColor}`,
  minHeight: '100vh',
};

export const TRRIdHeaderStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '26px',
  fontWeight: 400,
  color: softBlackColor,
  paddingTop: '16px',
  paddingBottom: '16px',
  margin: '0 16px',
};

export const contentStyle = {
  minHeight: 'calc(100vh - 136px)',
  paddingBottom: '128px',
};

export const footerStyle = {
  wrapper: {
    backgroundColor: 'transparent'
  },
};
