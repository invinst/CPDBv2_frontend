import { lightGreyColor, accentColor } from 'utils/styles';


export const outerWrapperStyle = {
  base: {
    cursor: 'pointer',
    borderStyle: 'solid',
    borderColor: lightGreyColor,
    borderWidth: '0 1px 0 0',
    ':hover': {
      color: accentColor
    }
  },
  rightAlign: {
    borderWidth: '0'
  }
};

export const storyWrapperStyle = {
  base: {
    height: '264.5px',
    paddingRight: '16px',
    paddingLeft: '16px',
    boxSizing: 'border-box',
    position: 'relative'
  },
  tablet: {
    height: '256px'
  },
  extraWide: {
    height: '320px'
  }
};

export const contentStyle = {
  overflow: 'hidden',
  height: 'calc(100% - 17.5px)'
};

export const paperStyleDesktop = {
  marginTop: '0',
  marginBottom: '9px'
};

export const storyImageStyle = {
  base: {
    height: '264.5px'
  },
  tablet: {
    height: '256px'
  },
  extraWide: {
    height: '320px'
  }
};
