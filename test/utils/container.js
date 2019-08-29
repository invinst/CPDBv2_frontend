import { mergeEditWrapperStateProps } from 'utils/container';

describe('Container utils', function () {
  describe('mergeEditWrapperStateProps', function () {
    it('should return merged props', function () {
      const stateProps = {
        fields: 'field prop',
        sectionEditModeOn: true,
        anotherStateProp: 'a',
      };

      const dispatchProps = {
        onSaveForm: 'save form',
        turnOnSectionEditMode: 'turn on',
        turnOffSectionEditMode: 'turn off',
        anotherDispatchProps: 'b',
      };

      const ownProps = {
        style: 'style props',
      };

      mergeEditWrapperStateProps(stateProps, dispatchProps, ownProps).should.eql({
        style: 'style props',
        anotherStateProp: 'a',
        anotherDispatchProps: 'b',
        editWrapperStateProps: {
          fields: 'field prop',
          sectionEditModeOn: true,
          onSaveForm: 'save form',
          turnOnSectionEditMode: 'turn on',
          turnOffSectionEditMode: 'turn off',
        },
      });
    });
  });
});
