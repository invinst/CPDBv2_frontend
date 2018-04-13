import { whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  borderRadius: '2px',
  border: `1px solid ${whiteTwoColor}`,
  backgroundColor: 'white',
  margin: '0 6px',
};

export const chunkStyle = (lastItem) => ({
  borderBottom: !lastItem ? `1px solid ${whiteTwoColor}` : 'none',
});

export const clearfixStyle = {
  clear: 'both',
};

export const nestedWrapperStyle = {
  margin: '8px',
};
