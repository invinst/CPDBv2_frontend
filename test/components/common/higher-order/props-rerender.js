import PropsRerender from 'components/common/higher-order/props-rerender';


describe('PropsRerender component', function () {
  it('should render sub-component', function () {
    PropsRerender.should.renderSubComponent();
  });
});
