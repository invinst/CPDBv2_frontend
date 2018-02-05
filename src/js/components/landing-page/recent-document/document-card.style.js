import { whiteTwoColor, sugarCaneColor, greyishColor, clayGray } from 'utils/styles';

export const documentCardWrapperStyle = {
  width: '232px',
  height: '266px',
  borderRadius: '2px',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box'
};

export const thumbnailDocumentStyle = {
  height: '209px',
  borderRadius: '2px',
  backgroundColor: sugarCaneColor,
};

export const imageDocumentStyle = {
  width: '133px',
  height: '176px',
  marginLeft: '49px',
  marginTop: '16px',
  border: `solid 1px ${greyishColor}`,
};


export const descriptionDocumentStyle = {
  width: '200px',
  height: '36px',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'left',
  marginLeft: '16px',
  marginTop: '10px',
  color: clayGray,
};
