import { greyishColor, softBlackColor, sugarCaneColor, clayGray } from 'utils/styles';
import { backButtonWidth } from './search-page.style';


const marginRight = 23;
export const searchInputStyle = {
  input: {
    color: softBlackColor,
    outline: 'none',
    border: 0,
    fontSize: '14px',
    verticalAlign: 'top',
    fontWeight: 500,
    backgroundColor: sugarCaneColor
  },
  wrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '32px',
    padding: 0
  },
  placeholder: {
    color: greyishColor,
    fontSize: '14px'
  }
};

export const searchTermsButtonStyle = (hidden) => ({
  position: 'absolute',
  color: hidden ? clayGray : softBlackColor,
  right: '16px',
  lineHeight: '32px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer'
});

export const wrapperStyle = {
  position: 'relative',
  width: `calc(100% - ${backButtonWidth + marginRight}px)`,
  display: 'inline-block',
  marginRight: `${marginRight}px`
};
