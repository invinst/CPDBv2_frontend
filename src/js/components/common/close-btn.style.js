export const closeButtonStyle = {
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  border: '1px solid #efefef',
  background: '#efefef',
  position: 'relative',
  appearance: 'none',
  left: 'calc(50% - 17.5px)'
};

export const closeButtonIconWrapperStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '19px',
  height: '19px',
  overflow: 'hidden',
  top: '3px'
};

export const closeButtonIconStyle = {
  pseudo: {
    height: '1px',
    transform: 'rotate(45deg)',
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: 0,
    marginTop: '-1px',
    background: '#000'
  },
  before: {
    transform: 'rotate(45deg)'
  },
  after: {
    transform: 'rotate(-45deg)'
  }
};
