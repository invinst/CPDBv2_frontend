import { previewPaneWidth } from './preview-pane.style';

export const resultWrapperStyle = {
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  position: 'relative'
};

export const columnWrapperStyle = shouldShowPreviewPane => {
  return {
    overflowX: 'auto',
    width: `calc(100% - ${shouldShowPreviewPane ? previewPaneWidth : 0}px)`
  };
};
