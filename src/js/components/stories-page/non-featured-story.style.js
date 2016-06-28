import { accentColor, lightGreyColor } from 'utils/styles';


export const storyStyle = {
  wrapper: {
    borderStyle: 'solid',
    borderColor: lightGreyColor,
    borderWidth: '1px 0 0 1px',
    height: '160px',
    paddingTop: '16px'
  },
  paragraph: {
    fontSize: '16px'
  }
};

export const edgeStoryStyle = {
  wrapper: {
    borderStyle: 'solid',
    borderColor: lightGreyColor,
    borderWidth: '1px 0 0',
    height: '160px',
    paddingTop: '16px'
  },
  paragraph: {
    fontSize: '16px'
  }
};

export const imageStyle = {
  height: '160px'
};

export const imageStoryWrapperStyle = {
  cursor: 'pointer',
  ':hover': {
    color: accentColor
  }
};
