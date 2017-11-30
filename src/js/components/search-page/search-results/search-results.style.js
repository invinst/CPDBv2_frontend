import {
  fashionPinkColor,
  pinkishWhiteColor
} from 'utils/styles';


export const resultWrapperStyle = (shouldShowPreviewPane) => ({
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  position: 'relative',
  height: 'calc(100% - 2px)',
  width: `calc(100% - ${shouldShowPreviewPane ? 320 : 0}px)`,
  display: 'inline-block'
});

export const columnWrapperStyle = {
  overflowX: 'auto',
  height: '100%'
};

export const plusWrapperStyle = {
  height: '74px',
  textAlign: 'center',
  fontSize: '36px',
  color: fashionPinkColor,
  fontWeight: '600',
  backgroundColor: pinkishWhiteColor,
  boxSizing: 'border-box',
  cursor: 'pointer',
  marginLeft: '16px',
  marginBottom: '20px',
  width: '40%',
  minWidth: '480px',
  margin: 'auto'
};

export const plusSignStyle = {
  // Reset <a> link styles:
  textDecoration: 'none',
  color: 'inherit',

  position: 'relative',
  display: 'block',
  top: '50%',
  transform: 'translateY(-50%)'
};

export const suggestionResultsStyle = {
  position: 'relative',
  height: 'calc(100% - 43px)'
};
