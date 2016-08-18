import { sanFranciscoTextFamily } from 'utils/styles';
import { softBlackColor } from 'utils/styles';


export const faqFormFontStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px'
};

export const faqFormStyle = {
  outerWrapper: {
    height: '120px',
    paddingLeft: '32px',
    paddingBottom: '100px'
  },
  innerWrapper: {
    lineHeight: '120px'
  },
  label: {
    fontWeight: 'bold',
    color: softBlackColor,
    marginRight: '20px'
  }
};

export const inputGroupStyle = {
  wrapper: {
    display: 'inline-block'
  },

  titleInput: {
    height: '34px',
    paddingLeft: '15px',
    borderColor: '#d0d2d3',
    borderStyle: 'solid',
    borderWidth: '1px 0 1px 1px'
  },

  button: {
    base: {
      height: '38px',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.5)',
      appearance: 'none',
      backgroundColor: '#F4F4F4',
      width: '94px',
      padding: '1px 0 1px 0',
      borderColor: '#d0d2d3',
      borderStyle: 'solid',
      borderWidth: '1px 1px 1px 0'
    },

    enabled: {
      color: '#231f20'
    }
  }
};

export const responsiveTitleInput = {
  extraWide: {
    width: '333px'
  },
  desktop: {
    width: '333px'
  },
  tablet: {
    width: '333px'
  }
};
