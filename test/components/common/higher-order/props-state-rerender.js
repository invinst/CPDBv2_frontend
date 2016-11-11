import PropsStateRerender from 'components/common/higher-order/props-state-rerender';


describe('PropsStateRerender component', function () {
  it('should render sub-component', function () {
    PropsStateRerender.should.renderSubComponent();
  });
});
